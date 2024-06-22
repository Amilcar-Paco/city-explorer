import React from 'react';
import { useTranslation } from 'react-i18next';
import CurrencyExchangeRateCard from './CurrencyExchangeRateCard';

const dummyExchangeRateData = {
    base: 'USD',
    date: '2023-06-21',
    rates: {
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110.53
    }
};


const CurrencyExchangeRate: React.FC = () => {

    const { t } = useTranslation()

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('EXCHANGE_RATE')}</h2>
            <CurrencyExchangeRateCard exchangeRateData={dummyExchangeRateData} />
        </div>
    );
};

export default CurrencyExchangeRate;
