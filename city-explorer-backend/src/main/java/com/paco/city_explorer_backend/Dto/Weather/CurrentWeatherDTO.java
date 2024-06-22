package com.paco.city_explorer_backend.Dto.Weather;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CurrentWeatherDTO {
    private long dt; // Current timestamp
    private long sunrise; // Sunrise timestamp
    private long sunset; // Sunset timestamp
    private double temp; // Temperature in Kelvin
    private double feels_like; // Temperature feels like in Kelvin
    private int pressure; // Atmospheric pressure in hPa
    private int humidity; // Humidity percentage
    private double dew_point; // Temperature dew point in Kelvin
    private double uvi; // UV index
    private int clouds; // Cloudiness percentage
    private int visibility; // Visibility in meters
    private double wind_speed; // Wind speed in meters/second
    private int wind_deg; // Wind direction in degrees
    private ArrayList<WeatherDescriptionDTO> weather;
}
