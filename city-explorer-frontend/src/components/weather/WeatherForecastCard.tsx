import React from 'react';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

interface WeatherData {
    datetime: string;
    state: string;
    country: string;
    temp: number;
    feels_like: number;
    main: string;
    description: string;
    wind_speed: number;
    wind_direction: string;
    pressure: number;
    humidity: number;
    uvi: number;
    dew_point: number;
    visibility: number;
    icon: string;
    lat: number;
    lon: number;
}

const WeatherForecastCard: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
    const { t } = useTranslation();

    const {
        datetime,
        state,
        country,
        temp,
        feels_like,
        main,
        description,
        wind_speed,
        wind_direction,
        pressure,
        humidity,
        uvi,
        dew_point,
        visibility,
        icon
    } = weatherData;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{state}, {country}</h2>
            <p className="text-gray-700">{new Date(datetime).toLocaleString()}</p>
            <div className="flex items-center my-4">
                <img src={icon} alt="Weather icon" className="h-12 w-12" />
                <div className="ml-4">
                    <p className="text-2xl font-bold">{temp}°C</p>
                    <p className="text-gray-600">{main} - {description}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>{t('FEELS_LIKE')}: {feels_like}°C</div>
                <div>{t('WIND')}: {wind_speed} m/s {wind_direction}</div>
                <div>{t('PRESSURE')}: {pressure} hPa</div>
                <div>{t('HUMIDITY')}: {humidity}%</div>
                <div>{t('UV_INDEX')}: {uvi}</div>
                <div>{t('DEW_POINT')}: {dew_point}°C</div>
                <div>{t('VISIBILITY')}: {visibility} km</div>
            </div>
        </div>
    );
};

export default WeatherForecastCard;
