package com.paco.city_explorer_backend.Dto.Weather;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WeatherDTO {
    public double lat;
    public double lon;
    public String timezone;
    public int timezone_offset;
    public CurrentWeatherDTO current;
}
