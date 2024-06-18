import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple form validation
        const { email, password } = formData;
        if (!email || !password) {
            setErrors({
                email: !email,
                password: !password,
            });
            return;
        }

        // Handle form submission
        console.log(formData);
        // Reset form data and errors
        setFormData({
            email: '',
            password: '',
            rememberMe: false,
        });
        setErrors({
            email: false,
            password: false,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                    <div className="flex justify-center">
                        <svg
                            className="h-12 w-auto"
                            viewBox="0 0 40 40"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20 4a16 16 0 0 0-9.395 2.98l-.185.137-.138-.099A16 16 0 1 0 20 4zm0 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-6 7h12c.667 0 1 .334 1 1v1c0 .667-.333 1-1 1h-12c-.666 0-1-.333-1-1v-1c0-.666.334-1 1-1zm0 5c-.667 0-1 .333-1 1v1c0 .667.333 1 1 1h12c.667 0 1-.333 1-1v-1c0-.667-.333-1-1-1z"
                            />
                        </svg>
                    </div>
                    <div className="mt-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address <span className="text-red-500">*</span>
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
                                    Password <span className="text-red-500">*</span>
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
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="flex justify-between">
                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500" onClick={() => navigate('/register')}>
                                    Don't have an account? Sign Up
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
