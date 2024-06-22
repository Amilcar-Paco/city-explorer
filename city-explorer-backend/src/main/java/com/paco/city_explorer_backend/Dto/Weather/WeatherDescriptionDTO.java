package com.paco.city_explorer_backend.Dto.Weather;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherDescriptionDTO {
    private String main;
    private String description;
    private String icon;
}
