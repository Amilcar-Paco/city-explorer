// src/components/CurrencyExchangeRateCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CurrencyExchangeRateData {
    base: string;
    date: string;
    rates: { [key: string]: number };
}

const CurrencyExchangeRateCard: React.FC<{ exchangeRateData: CurrencyExchangeRateData }> = ({ exchangeRateData }) => {
    const { base, date, rates } = exchangeRateData;
    const { t } = useTranslation()

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700 font-semibold">{new Date(date).toLocaleDateString()}</p>
            <p className="text-gray-700 font-medium">{t('BASE_CURRENCY')} {base}</p>
            <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
                {Object.keys(rates).map((currency) => (
                    <div key={currency}>
                        <div className="font-bold">{currency}</div>
                        <div>{rates[currency].toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrencyExchangeRateCard;
