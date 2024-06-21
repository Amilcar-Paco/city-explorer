package com.paco.city_explorer_backend.Service;

import com.paco.city_explorer_backend.Dto.ExchangeRateDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class ExchangeRateService {

    private static final Logger logger = LoggerFactory.getLogger(ExchangeRateService.class);

    @Value("${exchange.base-url}")
    private String exchangeApiBaseUrl;

    @Value("${exchange.key}")
    private String accessKey;

    private final RestTemplate restTemplate;

    public ExchangeRateService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "exchangeRates", key = "{#baseCurrency, #symbols}")
    public ExchangeRateDTO getTodayExchangeRates(String baseCurrency, String symbols) {
        try {
            LocalDate today = LocalDate.now();
            String formattedDate = today.format(DateTimeFormatter.ISO_DATE);
            String apiUrl = buildApiUrl(baseCurrency, formattedDate, symbols);

            logger.info("Fetching exchange rates from: {}", apiUrl);

            ExchangeRateDTO exchangeRateDTO = fetchExchangeRates(apiUrl);

            logger.info("Successfully fetched exchange rates");

            return exchangeRateDTO;
        } catch (IllegalArgumentException e) {
            logger.error("Invalid input parameters: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid input parameters", e);
        } catch (Exception e) {
            logger.error("Failed to fetch exchange rates: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch exchange rates: " + e.getMessage(), e);
        }
    }

    private String buildApiUrl(String baseCurrency, String date, String symbols) {
        return exchangeApiBaseUrl + "/" + date + "?access_key=" + accessKey +
                "&base=" + baseCurrency + "&symbols=" + symbols;
    }

    private ExchangeRateDTO fetchExchangeRates(String apiUrl) {
        try {
            return restTemplate.getForObject(apiUrl, ExchangeRateDTO.class);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                logger.error("Bad Request - Invalid input parameters: {}", e.getMessage());
                throw new IllegalArgumentException("Bad Request - Invalid input parameters", e);
            } else {
                logger.error("External API error: {}", e.getMessage());
                throw new RuntimeException("External API error: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            logger.error("Failed to fetch exchange rates: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch exchange rates: " + e.getMessage(), e);
        }
    }
}
