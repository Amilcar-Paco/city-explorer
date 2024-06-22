package com.paco.city_explorer_backend.Dto.Exchange;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;

@Getter
@Setter
public class ExchangeRateDTO {
    private boolean success;
    private long timestamp;
    private boolean historical;
    private String base;
    private LocalDate date;
    private Map<String, Double> rates;
}
