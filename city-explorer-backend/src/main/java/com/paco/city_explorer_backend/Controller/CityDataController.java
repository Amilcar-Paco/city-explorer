package com.paco.city_explorer_backend.Controller;

import com.paco.city_explorer_backend.Dto.CityDataDTO;
import com.paco.city_explorer_backend.Exception.ResourceNotFoundException;
import com.paco.city_explorer_backend.Service.CityDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/city")
@Tag(name = "City Data", description = "API for city data operations")
public class CityDataController {

    @Autowired
    private CityDataService cityDataService;

    /**
     * Endpoint to get weather information for a city.
     *
     * @param cityName the name of the city
     * @return ResponseEntity containing the CityDataDTO with weather information
     */
    @Operation(summary = "Get weather information for a city", description = "Fetch weather data for a specified city by name.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved weather data"),
            @ApiResponse(responseCode = "404", description = "City not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected error")
    })
    @GetMapping("/weather/{cityName}")
    public Object getWeatherForCity(
            @Parameter(description = "Name of the city to retrieve weather data for", required = true)
            @PathVariable String cityName) {
        try {
            CityDataDTO cityData = cityDataService.getCityData(cityName);
            return ResponseEntity.ok(cityData);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
