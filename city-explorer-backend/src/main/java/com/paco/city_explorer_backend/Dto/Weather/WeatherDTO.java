package com.paco.city_explorer_backend.Dto.Weather;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class WeatherDTO {
    private String timezone;
    private int timezone_offset;
    private GeoLocationDTO geoLocation;
    private CurrentWeatherDTO current;
}
