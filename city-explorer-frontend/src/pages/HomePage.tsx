import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherForecast from "../components/weather/WeatherForecast";
import CurrencyExchangeRate from "../components/exchange/CurrencyExchangeRate";
import PopulationGdp from "../components/population/PopulationGdp";

const HomePage: React.FC = () => {

    const { t } = useTranslation()

    const handleSearch = (query: string) => {
        // Implement search logic here
        console.log('Searching for:', query);
        // Optionally, you can navigate to another page or fetch data based on the query
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header firstName="John" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">{t('APP_NAME')}</h1>
                    <p className="mt-2 text-lg text-gray-600">{t('APP_DESCRIPTION')}</p>
                </div>
                <SearchBar onSearch={handleSearch} placeholder={t('SEARCH_PLACEHOLDER')} className="max-w-lg mx-auto mt-8" />
                <WeatherForecast />
                <CurrencyExchangeRate />
                <PopulationGdp />
            </div>
        </div>
    );
}

export default HomePage;