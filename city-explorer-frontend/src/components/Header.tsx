import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{ firstName?: string }> = ({ firstName }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Logo"
                        />
                        <span className="ml-2 text-xl font-bold text-indigo-600"> {t('APP_NAME')}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 hidden sm:inline">
                            {t('HELLO_LABEL')} {firstName || 'Guest'}
                        </span>
                        <button
                            className="text-indigo-600 hover:text-indigo-500"
                            onClick={() => navigate('/login')}
                        >
                            {t('SIGN_IN')}
                        </button>
                        <button
                            className="text-indigo-600 hover:text-indigo-500"
                            onClick={() => navigate('/register')}
                        >
                             {t('SIGN_UP')}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center h-16 sm:hidden">
                    <span className="text-gray-700">
                    {t('HELLO_LABEL')}5\'
                    ' {firstName || 'Guest'}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
