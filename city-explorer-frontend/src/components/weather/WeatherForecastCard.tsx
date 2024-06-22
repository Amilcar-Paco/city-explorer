import React from 'react';
import {
    WiDaySunny,
    WiNightClear,
    WiDayCloudy,
    WiNightAltCloudy,
    WiDayCloudyHigh,
    WiNightAltCloudyHigh,
    WiDayRainMix,
    WiNightAltRainMix,
    WiDayThunderstorm,
    WiNightAltThunderstorm,
    WiDaySnow,
    WiNightAltSnow,
    WiDayFog,
    WiNightFog
} from 'react-icons/wi';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

interface WeatherData {
    datetime: string;
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    description: string;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    humidity: number;
    uvIndex: number;
    dewPoint: number;
    visibility: number;
    iconCode: string;
    lat: number;
    lon: number;
}

const WeatherForecastCard: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
    const { t } = useTranslation()

    const {
        datetime,
        city,
        country,
        temperature,
        feelsLike,
        description,
        windSpeed,
        windDirection,
        pressure,
        humidity,
        uvIndex,
        dewPoint,
        visibility,
        iconCode,
    } = weatherData;

    const getWeatherIcon = (code: string) => {
        switch (code) {
            case '01d':
                return <WiDaySunny size={48} />;
            case '01n':
                return <WiNightClear size={48} />;
            case '02d':
                return <WiDayCloudy size={48} />;
            case '02n':
                return <WiNightAltCloudy size={48} />;
            case '03d':
                return <WiDayCloudyHigh size={48} />;
            case '03n':
                return <WiNightAltCloudyHigh size={48} />;
            case '04d':
                return <WiDayCloudy size={48} />;
            case '04n':
                return <WiNightAltCloudy size={48} />;
            case '09d':
                return <WiDayRainMix size={48} />;
            case '09n':
                return <WiNightAltRainMix size={48} />;
            case '10d':
                return <WiDayRainMix size={48} />;
            case '10n':
                return <WiNightAltRainMix size={48} />;
            case '11d':
                return <WiDayThunderstorm size={48} />;
            case '11n':
                return <WiNightAltThunderstorm size={48} />;
            case '13d':
                return <WiDaySnow size={48} />;
            case '13n':
                return <WiNightAltSnow size={48} />;
            case '50d':
                return <WiDayFog size={48} />;
            case '50n':
                return <WiNightFog size={48} />;
            default:
                return <WiDaySunny size={48} />;
        }
    };


    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{city}, {country}</h2>
            <p className="text-gray-700">{new Date(datetime).toLocaleString()}</p>
            <div className="flex items-center my-4">
                {getWeatherIcon(iconCode)}
                <div className="ml-4">
                    <p className="text-2xl font-bold">{temperature}°C</p>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>{t('FEELS_LIKE')}: {feelsLike}°C</div>
                <div>{t('WIND')}: {windSpeed} m/s {windDirection}</div>
                <div>{t('PRESSURE')}: {pressure} hPa</div>
                <div>{t('HUMIDITY')}: {humidity}%</div>
                <div>{t('UV_INDEX')}: {uvIndex}</div>
                <div>{t('DEW_POINT')}: {dewPoint}°C</div>
                <div>{t('VISIBILITY')}: {visibility} km</div>
            </div>
        </div>
    );
};

export default WeatherForecastCard;
