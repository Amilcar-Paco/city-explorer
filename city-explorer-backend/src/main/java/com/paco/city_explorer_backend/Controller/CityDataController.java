package com.paco.city_explorer_backend.Controller;

import com.paco.city_explorer_backend.Dto.CityDataDTO;
import com.paco.city_explorer_backend.Service.CityDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/city")
public class CityDataController {

    @Autowired
    private CityDataService cityDataService;

    @GetMapping("/weather/{cityName}")
    public CityDataDTO getWeatherForCity(@PathVariable String cityName) {
       return cityDataService.getCityData(cityName);
    }
}
