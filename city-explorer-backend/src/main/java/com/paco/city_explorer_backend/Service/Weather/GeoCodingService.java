package com.paco.city_explorer_backend.Service.Weather;

import com.paco.city_explorer_backend.Dto.Weather.GeoLocationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeoCodingService {

    private static final Logger logger = LoggerFactory.getLogger(GeoCodingService.class);

    @Value("${weather.base-url}")
    private String apiBaseUrl;

    @Value("${weather.key}")
    private String accessKey;

    @Value("${weather.limit}")
    private String limit;

    private final RestTemplate restTemplate;

    public GeoCodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public GeoLocationDTO geoLocation(String cityName) {
        try {
            String apiUrl = buildApiUrl(cityName);
            GeoLocationDTO[] response = restTemplate.getForObject(apiUrl, GeoLocationDTO[].class);
            if (response != null && response.length > 0) {
                return response[0];
            } else {
                logger.error("No geolocation data found for city: {}", cityName);
                return null;
            }
        } catch (Exception e) {
            logger.error("Error fetching geolocation data for city: {}", cityName, e);
            return null;
        }
    }

    private String buildApiUrl(String cityName) {
        return apiBaseUrl + "/geo/1.0/direct?q=" + cityName + "&limit=" + limit + "&appid=" + accessKey;
    }
}
