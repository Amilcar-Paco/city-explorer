package com.paco.city_explorer_backend.Dto;

import com.paco.city_explorer_backend.Dto.Weather.WeatherDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CityDataDTO {
    private WeatherDTO weather;
}
