package com.paco.city_explorer_backend;

import com.paco.city_explorer_backend.Dto.ExchangeRateDTO;
import com.paco.city_explorer_backend.Service.ExchangeRateService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ExchangeRateServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private ExchangeRateService exchangeRateService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTodayExchangeRates_HttpClientErrorException() {
        // Mock data
        String baseCurrency = "EUR";
        String symbols = "USD";
        LocalDate today = LocalDate.now();
        String formattedDate = today.toString();
        String apiUrl = "http://example.com/" + formattedDate + "?access_key=your_access_key&base=" + baseCurrency + "&symbols=" + symbols;

        // Mock HttpClientErrorException
        HttpClientErrorException exception = new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad Request - Invalid input parameters");
        when(restTemplate.getForObject(apiUrl, ExchangeRateDTO.class)).thenThrow(exception);

        // Call the service method and assert exception handling
        try {
            exchangeRateService.getTodayExchangeRates(baseCurrency, symbols);
        } catch (IllegalArgumentException e) {
            assertEquals("Bad Request - Invalid input parameters", e.getMessage());
        }
    }
}
