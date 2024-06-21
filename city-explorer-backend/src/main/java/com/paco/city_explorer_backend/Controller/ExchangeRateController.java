package com.paco.city_explorer_backend.Controller;

import com.paco.city_explorer_backend.Dto.ExchangeRateDTO;
import com.paco.city_explorer_backend.Service.ExchangeRateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/exchange-rates")
@Tag(name = "Exchange Rate API", description = "API for fetching exchange rates")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    public ExchangeRateController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    @Operation(summary = "Get today's exchange rates by base currency and symbols")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved exchange rates for today"),
            @ApiResponse(responseCode = "400", description = "Bad Request - Invalid input parameters"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping("/{baseCurrency}")
    public ResponseEntity<ExchangeRateDTO> getTodayExchangeRates(
            @PathVariable String baseCurrency,
            @RequestParam String symbols) {
        try {
            ExchangeRateDTO exchangeRateDTO = exchangeRateService.getTodayExchangeRates(baseCurrency, symbols);
            return ResponseEntity.ok(exchangeRateDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
