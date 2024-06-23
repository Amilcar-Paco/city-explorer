package com.paco.city_explorer_backend.Dto.Weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class GeoLocationDTO {
    private double lat;
    private double lon;
    private String country;
    private String state;
}
