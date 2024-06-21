package com.paco.city_explorer_backend.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeoLocationDTO {
    private double lat;
    private double lon;
    private String country;
    private String state;
}
