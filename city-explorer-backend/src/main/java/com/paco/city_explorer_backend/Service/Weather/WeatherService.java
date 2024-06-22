package com.paco.city_explorer_backend.Service.Weather;

import com.paco.city_explorer_backend.Dto.Weather.WeatherDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
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

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "weatherCache", key = "#lat + '-' + #lon")
    public WeatherDTO getWeather(Double lat, Double lon) {
        try {
            String apiUrl = buildApiUrl(lat, lon);
            WeatherDTO weather = restTemplate.getForObject(apiUrl, WeatherDTO.class);
            if (weather != null) {
                // Convert temperatures to Celsius
                weather.getCurrent().setTemp(convertKelvinToCelsius(weather.getCurrent().getTemp()));
                weather.getCurrent().setFeels_like(convertKelvinToCelsius(weather.getCurrent().getFeels_like()));
                weather.getCurrent().setDew_point(convertKelvinToCelsius(weather.getCurrent().getDew_point()));
            }
            return weather;
        } catch (Exception e) {
            logger.error("Error fetching weather data for coordinates: {}, {}", lat, lon, e);
            return null;
        }
    }

    private String buildApiUrl(double lat, double lon) {
        return apiBaseUrl + "/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&daily&appid="
                + accessKey;
    }

    private double convertKelvinToCelsius(double kelvin) {
        return kelvin - 273.15;
    }
}
