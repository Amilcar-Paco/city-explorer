package com.paco.city_explorer_backend.Service;

import com.paco.city_explorer_backend.Dto.GeoLocationDTO;
import com.paco.city_explorer_backend.Dto.WeatherDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);

    @Value("${weather.base-url}")
    private String apiBaseUrl;

    @Value("${weather.key}")
    private String accessKey;

    private final RestTemplate restTemplate;
    private final GeocodingService geocodingService;

    public WeatherService(RestTemplate restTemplate, GeocodingService geocodingService) {
        this.restTemplate = restTemplate;
        this.geocodingService = geocodingService;
    }

    public WeatherDTO getWeather(String cityName) {
        try {
            GeoLocationDTO geoLocation = geocodingService.geoLocation(cityName);
            if (geoLocation != null) {
                String apiUrl = buildApiUrl(geoLocation.getLat(), geoLocation.getLon());
                return restTemplate.getForObject(apiUrl, WeatherDTO.class);
            } else {
                logger.error("No geolocation data found for city: {}", cityName);
                return null;
            }
        } catch (Exception e) {
            logger.error("Error fetching weather data for city: {}", cityName, e);
            return null;
        }
    }

    private String buildApiUrl(double lat, double lon) {
        return apiBaseUrl + "/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + accessKey;
    }
}
