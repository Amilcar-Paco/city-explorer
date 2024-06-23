import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface PopulationGdpData {
  city: string;
  population: number | null;
  gdp: number | null;
  date: string;
}

interface PopulationGdpTableProps {
  data: PopulationGdpData[];
}

const ITEMS_PER_PAGE = 10;

const PopulationGdpTable: React.FC<PopulationGdpTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('');
  const { t } = useTranslation()

  // Ensure the data is an array
  const populationGdpData: PopulationGdpData[] = Array.isArray(data) ? data : [];

  // Filter and sort the data by the selected year and most recent date first
  const filteredData = useMemo(() => {
    return populationGdpData
      .filter(item => !selectedYear || item.date.includes(selectedYear))
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [populationGdpData, selectedYear]);

  // Paginate the data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">{t('FILTER_BY_YEAR')}</label>
        <input
          type="text"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          className="border rounded p-2"
          placeholder="YYYY"
        />
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">{t('COUNTRY')}</th>
            <th className="py-2 px-4 border">{t('POPULATION')}</th>
            <th className="py-2 px-4 border">{t('GDP')}</th>
            <th className="py-2 px-4 border">{t('DATE')}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{item.city}</td>
              <td className="py-2 px-4 border">{item.population?.toLocaleString() || 'N/A'}</td>
              <td className="py-2 px-4 border">{item.gdp?.toLocaleString() || 'N/A'}</td>
              <td className="py-2 px-4 border">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          {t('PREVIOUS')}
        </button>
        <span>
          {t('PAGE')} {currentPage} {t('OF')} {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="ml-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          {t('NEXT')}
        </button>
      </div>
    </div>
  );
};

export default PopulationGdpTable;
