import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchExchangeRate, fetchWeatherData } from '../features/cityData/cityDataSlice';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', className }) => {
    const [query, setQuery] = useState('');
    const { t } = useTranslation();
    const loading = useAppSelector(state => state.cityData.loading);
    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() !== '') {
            await dispatch(fetchWeatherData(query.trim()))
            await dispatch(fetchExchangeRate())
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`flex ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={loading}
            />
            <button
                type="submit"
                className={`ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm
                font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-6-7.938V4c-1.865 1.114-3 3.896-3 7.938h3z"
                        ></path>
                    </svg>
                ) : (
                    t('SEARCH')
                )}
            </button>
        </form>
    );
};

export default SearchBar;
