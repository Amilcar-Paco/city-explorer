import React from 'react';
import { useTranslation } from 'react-i18next';

interface CurrencyExchangeRateData {
    base: string | null;
    date: string;
    rates: { [key: string]: number };
}

const CurrencyExchangeRateCard: React.FC<{ exchangeRateData?: CurrencyExchangeRateData }> = ({ exchangeRateData }) => {
    const { t } = useTranslation();

    // Define mock data for bluer mode
    const mockExchangeRateData: CurrencyExchangeRateData = {
        base: 'USD',
        date: '2023-06-21',
        rates: {
            EUR: 0.85,
            GBP: 0.75,
            JPY: 110.53,
        },
    };

    // Check if exchangeRateData is defined and not null
    const isUserLoggedIn = exchangeRateData && exchangeRateData.base !== null

    return (
        <div className={`bg-white shadow rounded-lg p-6 ${isUserLoggedIn ? '' : 'blurred'}`}>
            {isUserLoggedIn ? (
                <>
                    <p className="text-gray-700 font-semibold">{new Date(exchangeRateData!.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 font-medium">{t('BASE_CURRENCY')} {exchangeRateData!.base}</p>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
                        {Object.keys(exchangeRateData!.rates).map((currency) => (
                            <div key={currency} className="flex items-center">
                                <div className="font-bold">{currency}</div>
                                <div>{exchangeRateData!.rates[currency].toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p className="text-gray-700 font-semibold">{new Date(mockExchangeRateData.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 font-medium">{t('BASE_CURRENCY')} {mockExchangeRateData.base}</p>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
                        {Object.keys(mockExchangeRateData.rates).map((currency) => (
                            <div key={currency} className="flex items-center">
                                <div className="font-bold">{currency}</div>
                                <div>{mockExchangeRateData.rates[currency].toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CurrencyExchangeRateCard;
