import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/redux';
import PopulationGdpTable from './PopulationGdpTable';

interface PopulationGdpData {
    city: string;
    population: number | null;
    gdp: number | null;
    date: string;
  }

const PopulationGdp: React.FC = () => {
    const populationAndGDPData = useAppSelector(state => state.cityData.population) as PopulationGdpData[];

    const { t } = useTranslation()
    
    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('POPULATION_GDP')}</h2>
            <PopulationGdpTable data={populationAndGDPData} />
        </div>
    );
};

export default PopulationGdp;
