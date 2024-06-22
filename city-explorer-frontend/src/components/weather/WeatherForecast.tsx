import React from 'react';
import WeatherForecastCard from './WeatherForecastCard';
import { useTranslation } from 'react-i18next';

const weatherData = {
    datetime: '2023-06-21T19:26:00',
    city: 'London',
    country: 'GB',
    temperature: 21,
    feelsLike: 20,
    description: 'Broken clouds',
    windSpeed: 6.2,
    windDirection: 'SW',
    pressure: 1009,
    humidity: 53,
    uvIndex: 1,
    dewPoint: 11,
    visibility: 10.0,
    iconCode: '03d',
    lat: 51.5074,
    lon: -0.1278
};

const WeatherForecast: React.FC = () => {

    const { t } = useTranslation()

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('WEATHER_FORECAST')}</h2>
            <WeatherForecastCard weatherData={weatherData} />
        </div>
    );
};

export default WeatherForecast;
