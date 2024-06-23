import React from 'react';
import { useTranslation } from 'react-i18next';
import CurrencyExchangeRateCard from './CurrencyExchangeRateCard';
import { useAppSelector } from '../../hooks/redux';


const CurrencyExchangeRate: React.FC = () => {

    const exchangeRateData = useAppSelector(state => state.cityData.exchangeRate);

    const { t } = useTranslation()

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('EXCHANGE_RATE')}</h2>
            <CurrencyExchangeRateCard exchangeRateData={exchangeRateData} />
        </div>
    );
};

export default CurrencyExchangeRate;
