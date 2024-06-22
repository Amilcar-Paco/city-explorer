package com.paco.city_explorer_backend.Service;

import com.paco.city_explorer_backend.Dto.Weather.WeatherDTO;
import com.paco.city_explorer_backend.Exception.ResourceNotFoundException;
import com.paco.city_explorer_backend.Service.Weather.GeoCodingService;
import com.paco.city_explorer_backend.Service.Weather.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityDataService {

    private static final Logger logger = LoggerFactory.getLogger(CityDataService.class);

    private final WeatherService weatherService;
    private final GeoCodingService geoCodingService;

    @Autowired
    public CityDataService(WeatherService weatherService, GeoCodingService geoCodingService) {
        this.weatherService = weatherService;
        this.geoCodingService = geoCodingService;
    }

    public WeatherDTO getCityData (String cityName) {
        var getLocation = geoCodingService.geoLocation(cityName);
        if (getLocation == null) {
            logger.error("No geolocation data found for city: {}", cityName);
            throw new ResourceNotFoundException("No geolocation data found for city: " + cityName);
        }
        return weatherService.getWeather(getLocation.getLat(), getLocation.getLon());
    }
}
