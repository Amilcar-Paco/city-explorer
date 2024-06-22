package com.paco.city_explorer_backend.Service;

import com.paco.city_explorer_backend.Dto.Weather.GeoLocationDTO;
import com.paco.city_explorer_backend.Dto.Weather.WeatherDTO;
import com.paco.city_explorer_backend.Exception.ResourceNotFoundException;
import com.paco.city_explorer_backend.Service.Weather.GeoCodingService;
import com.paco.city_explorer_backend.Service.Weather.WeatherService;
import com.paco.city_explorer_backend.Service.WorldBank.WorldBankDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class CityDataService {

    private static final Logger logger = LoggerFactory.getLogger(CityDataService.class);

    private final WeatherService weatherService;
    private final GeoCodingService geoCodingService;
    private final WorldBankDataService worldBankDataService;

    // World Bank indicator constants
    static final String populationIndicator = "SP.POP.TOTL";
    static final String gdpIndicator = "NY.GDP.MKTP.CD";

    @Autowired
    public CityDataService(
            WeatherService weatherService,
            GeoCodingService geoCodingService,
            WorldBankDataService worldBankDataService) {
        this.weatherService = weatherService;
        this.geoCodingService = geoCodingService;
        this.worldBankDataService = worldBankDataService;
    }

    /**
     * Retrieves weather data for a city.
     *
     * @param cityName The name of the city for which weather data is requested.
     * @return WeatherDTO containing weather information for the city.
     * @throws ResourceNotFoundException If no geolocation data is found for the city.
     */
    @Cacheable(value = "weatherCache", key = "#cityName")
    public WeatherDTO getCityData(String cityName) {
        var location = getLocation(cityName);
        return weatherService.getWeather(location.getLat(), location.getLon());
    }

    /**
     * Retrieves population data for a city.
     *
     * @param cityName The name of the city for which population data is requested.
     * @return WorldBankDataDTO containing population data for the city.
     * @throws ResourceNotFoundException If no geolocation data is found for the city.
     */
    @Cacheable(value = "worldBankCache", key = "#cityName + '-population'")
    public Object getPopulation(String cityName) {
        var location = getLocation(cityName);
        return worldBankDataService.fetchData(location.getCountry(), populationIndicator);
    }

    /**
     * Retrieves GDP data for a city.
     *
     * @param cityName The name of the city for which GDP data is requested.
     * @return WorldBankDataDTO containing GDP data for the city.
     * @throws ResourceNotFoundException If no geolocation data is found for the city.
     */
    @Cacheable(value = "worldBankCache", key = "#cityName + '-gdp'")
    public Object getGDP(String cityName) {
        var location = getLocation(cityName);
        return worldBankDataService.fetchData(location.getCountry(), gdpIndicator);
    }

    /**
     * Retrieves geolocation data for a city.
     *
     * @param cityName The name of the city for which geolocation data is requested.
     * @return GeoLocationDTO containing latitude and longitude of the city.
     * @throws ResourceNotFoundException If no geolocation data is found for the city.
     */
    private GeoLocationDTO getLocation(String cityName) {
        var location = geoCodingService.geoLocation(cityName);
        if (location == null) {
            logger.error("No geolocation data found for city: {}", cityName);
            throw new ResourceNotFoundException("No geolocation data found for city: " + cityName);
        }
        return location;
    }
}
