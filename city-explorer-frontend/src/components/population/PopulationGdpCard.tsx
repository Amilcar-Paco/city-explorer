import React from 'react';

interface PopulationGdpData {
    country: string;
    population: number;
    gdpPerCapita: number;
}

const PopulationGdpCard: React.FC<{ data: PopulationGdpData }> = ({ data }) => {
    const { country, population, gdpPerCapita } = data;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{country}</h2>
            <div className="text-gray-700">
                <p>Population: {population.toLocaleString()}</p>
                <p>GDP per Capita: ${gdpPerCapita.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default PopulationGdpCard;
