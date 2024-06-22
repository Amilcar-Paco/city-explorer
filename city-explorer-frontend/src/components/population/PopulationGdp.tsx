import React from 'react';
import { useTranslation } from 'react-i18next';
import PopulationGdpCard from './PopulationGdpCard';

const dummyPopulationGdpData = {
    country: 'United Kingdom',
    population: 66796807,
    gdpPerCapita: 42300
};


const PopulationGdp: React.FC = () => {

    const { t } = useTranslation()

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('EXCHANGE_RATE')}</h2>
            <PopulationGdpCard data={dummyPopulationGdpData} />
        </div>
    );
};

export default PopulationGdp;
