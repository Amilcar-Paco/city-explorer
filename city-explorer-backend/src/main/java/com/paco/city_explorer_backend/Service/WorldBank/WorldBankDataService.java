package com.paco.city_explorer_backend.Service.WorldBank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class WorldBankDataService {
    private static final Logger logger = LoggerFactory.getLogger(WorldBankDataService.class);

    @Value("${worldBank.base-url}")
    private String apiBaseUrl;

    private final RestTemplate restTemplate;

    public WorldBankDataService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object fetchData(String countryCode, String indicator) {
        try {
            String apiUrl = buildApiUrl(countryCode, indicator);
            return restTemplate.getForEntity(apiUrl, List.class).getBody();
        } catch (IllegalArgumentException e) {
            logger.error("Invalid input parameters: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid input parameters", e);
        } catch (Exception e) {
            logger.error("Failed to fetch data: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch data: " + e.getMessage(), e);
        }
    }

    private String buildApiUrl(String countryCode, String indicator) {
        return apiBaseUrl + "/country/" + countryCode + "/indicator/" + indicator + "?format=json";
    }
}
