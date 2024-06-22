import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search...', className }) => {
    const [query, setQuery] = useState('');
    const { t } = useTranslation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() !== '') {
            onSearch(query.trim());
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
            />
            <button
                type="submit"
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm
                font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {t('SEARCH')}
            </button>
        </form>
    );
};

export default SearchBar;
