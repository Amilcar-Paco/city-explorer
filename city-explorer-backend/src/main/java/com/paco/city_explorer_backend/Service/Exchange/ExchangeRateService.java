package com.paco.city_explorer_backend.Service.Exchange;

import com.paco.city_explorer_backend.Dto.Exchange.ExchangeRateDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class ExchangeRateService {

    private static final Logger logger = LoggerFactory.getLogger(ExchangeRateService.class);

    @Value("${exchange.base-url}")
    private String apiBaseUrl;

    @Value("${exchange.key}")
    private String accessKey;

    static final String defaultBaseCurrency = "EUR";
    static final String defaultSymbols = "MZN, ZAR, USD, GBP";

    private final RestTemplate restTemplate;

    public ExchangeRateService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable("exchangeRates")
    public ExchangeRateDTO getTodayExchangeRates() {
        try {
            LocalDate today = LocalDate.now();
            String formattedDate = today.format(DateTimeFormatter.ISO_DATE);
            String apiUrl = buildApiUrl(formattedDate);

            return restTemplate.getForObject(apiUrl, ExchangeRateDTO.class);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid input parameters: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid input parameters", e);
        } catch (Exception e) {
            logger.error("Failed to fetch exchange rates: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch exchange rates: " + e.getMessage(), e);
        }
    }

    private String buildApiUrl(String date) {
        return apiBaseUrl + "/" + date + "?access_key=" + accessKey +
                "&base=" + defaultBaseCurrency + "&symbols=" + defaultSymbols;
    }

}
