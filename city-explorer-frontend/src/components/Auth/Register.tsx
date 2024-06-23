import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { performRegister } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const Register: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allowExtraEmails: false,
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    });

    const loading = useAppSelector(state => state.auth.loading);
    const error = useAppSelector(state => state.auth.error);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple form validation
        const { firstName, lastName, email, password } = formData;
        if (!firstName || !lastName || !email || !password) {
            setErrors({
                firstName: !firstName,
                lastName: !lastName,
                email: !email,
                password: !password,
            });
            return;
        }

        try {
            await dispatch(performRegister(formData));
            navigate('/');
        } catch (error: any) {
            setErrors({
                firstName: false,
                lastName: false,
                email: false,
                password: false,
            });
        }

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            allowExtraEmails: false,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                    <div className="flex justify-center">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                    </div>
                    <div className="mt-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    {t('FIRST_NAME')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    {t('LAST_NAME')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('EMAIL_LABEL')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t('PASSWORD_LABEL')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="allowExtraEmails"
                                    name="allowExtraEmails"
                                    type="checkbox"
                                    checked={formData.allowExtraEmails}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="allowExtraEmails" className="ml-2 block text-sm text-gray-900">
                                    {t('MARKETING_EMAILS')}
                                </label>
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        }`}
                                >
                                    {loading ? t('LOADING') : t('SIGN_UP')}
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <p className="text-sm text-gray-600">
                                {t('ALREADY_HAVE_ACCOUNT')}{' '}
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => navigate('/login')}>
                                    {t('SIGN_IN')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
