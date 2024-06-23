import React from 'react';
import WeatherForecastCard from './WeatherForecastCard';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/redux';

const WeatherForecast: React.FC = () => {
    const weatherData = useAppSelector(state => state.cityData.weather);

    const { t } = useTranslation()

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('WEATHER_FORECAST')}</h2>
            <WeatherForecastCard weatherData={weatherData} />
        </div>
    );
};

export default WeatherForecast;
