import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { performLogin } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const Login: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const loading = useAppSelector(state => state.auth.loading);
    const error = useAppSelector(state => state.auth.error);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email || !password) {
            setErrors({
                email: !email,
                password: !password,
            });
            return;
        }

        try {
            await dispatch(performLogin({ email, password }));
            navigate('/');
        } catch (error: any) {
            console.error('Login failed:', error.message);
            setErrors({
                email: false,
                password: false,
            });
        }

        setFormData({
            email: '',
            password: ''
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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('EMAIL_LABEL')}
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
                                    {t('PASSWORD_LABEL')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
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
                                    className={`w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        }`}
                                >
                                    {loading ? t('LOADING') : t('SIGN_IN')}
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="flex justify-between">
                                <a href="#"
                                    className="text-sm text-indigo-600 hover:text-indigo-500">
                                    {t('FORGOT_PASSWORD')}
                                </a>
                                <a href="#"
                                    className="text-sm text-indigo-600 hover:text-indigo-500"
                                    onClick={() => navigate('/register')}>
                                    {t('SIGN_UP_LINK')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
