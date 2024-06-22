package com.paco.city_explorer_backend.Controller;

import com.paco.city_explorer_backend.Exception.ResourceNotFoundException;
import com.paco.city_explorer_backend.Service.CityDataService;
import com.paco.city_explorer_backend.Service.Exchange.ExchangeRateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/city")
@Tag(name = "City Data", description = "API for city data operations")
public class CityDataController {

    @Autowired
    private CityDataService cityDataService;

    @Autowired
    private ExchangeRateService exchangeRateService;

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
    public ResponseEntity<Object> getWeatherForCity(
            @Parameter(description = "Name of the city to retrieve weather data for", required = true)
            @PathVariable String cityName) {
        try {
            var cityData = cityDataService.getCityData(cityName);
            return ResponseEntity.ok(cityData);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Endpoint to get today's exchange rates.
     *
     * @return ResponseEntity containing the ExchangeRateDTO with today's exchange rates
     */
    @Operation(summary = "Get today's exchange rates")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved today's exchange rates",
                    content = {@io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json",
                            schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = Object.class),
                            examples = {@io.swagger.v3.oas.annotations.media.ExampleObject(value = """
                                    {
                                        "success": true,
                                        "timestamp": 1718927999,
                                        "historical": true,
                                        "base": "EUR",
                                        "date": "2024-06-20",
                                        "rates": {
                                            "MZN": 68.198185,
                                            "ZAR": 19.246588,
                                            "USD": 1.070699,
                                            "GBP": 0.845799
                                        }
                                    }""")})
                    }),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping("/exchange-rates")
    public ResponseEntity<Object> getTodayExchangeRates() {
        try {
            Object exchangeRates = exchangeRateService.getTodayExchangeRates();
            return ResponseEntity.ok(exchangeRates);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Endpoint to get population data for a city.
     *
     * @param cityName the name of the city
     * @return ResponseEntity containing the WorldBankDataDTO with population data
     */
    @Operation(summary = "Get population data for a city", description = "Fetch population data for a specified city by name.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved population data"),
            @ApiResponse(responseCode = "404", description = "City not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected error")
    })
    @GetMapping("/{cityName}/population")
    public ResponseEntity<Object> getPopulation(
            @Parameter(description = "Name of the city to retrieve population data for", required = true)
            @PathVariable String cityName) {
        try {
            var populationDTO = cityDataService.getPopulation(cityName);
            return new ResponseEntity<>(populationDTO, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Endpoint to get GDP data for a city.
     *
     * @param cityName the name of the city
     * @return ResponseEntity containing the WorldBankDataDTO with GDP data
     */
    @Operation(summary = "Get GDP data for a city", description = "Fetch GDP data for a specified city by name.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved GDP data"),
            @ApiResponse(responseCode = "404", description = "City not found"),
            @ApiResponse(responseCode = "500", description = "Unexpected error")
    })
    @GetMapping("/{cityName}/gdp")
    public ResponseEntity<Object> getGDP(
            @Parameter(description = "Name of the city to retrieve GDP data for", required = true)
            @PathVariable String cityName) {
        try {
            var gdpDTO = cityDataService.getGDP(cityName);
            return new ResponseEntity<>(gdpDTO, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
