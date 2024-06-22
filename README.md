# City Explorer Application

Welcome to the City Explorer application repository! This project integrates a feature-rich backend with essential frontend functionalities to facilitate city exploration and user management. Below is an overview of the application's features, setup instructions, error handling details, and how to explore its capabilities further.

## Features

### Backend
- **Authentication**: Implemented user registration, login functionality, and JWT-based authentication for secure access.
- **Swagger Documentation**: Interactive API documentation available at Swagger UI, detailing all available endpoints.
- **Caching**: Utilized caching mechanisms to enhance performance and reduce response times.
- **Rate Limiting**: Implemented rate limiting on API endpoints to ensure fair usage and protect against abuse.
- **Exchange Rate Service**: Integrated an external API to provide up-to-date exchange rate information.

### Frontend
- **User Interface**: Basic interfaces for user login and registration.
- **Multi-Language Support**: Implemented multi-language support to enhance accessibility.

## Project Status

Due to time constraints, not all requirements have been fully implemented in this repository (Map Integration). However, the application is functional, and additional features can be explored in a live coding session.

## API Routes

Here are the key API routes available in the backend:

- **Login**: `/api/v1/auth/login` - POST method for user authentication.
- **Register**: `/api/v1/auth/register` - POST method to register a new user.
- **Weather Information**: `/api/v1/city/weather/{cityName}` - GET method to fetch weather data for a city by name.
- **Exchange Rates**: `/api/v1/city/exchange-rates` - GET method to retrieve today's exchange rates.
- **Population Data**: `/api/v1/city/{cityName}/population` - GET method to fetch population data for a city by name.
- **GDP Data**: `/api/v1/city/{cityName}/gdp` - GET method to fetch GDP data for a city by name.

Explore more endpoints and their functionalities using the Swagger UI.

## Error Handling

The application implements robust error handling to ensure reliability and provide meaningful feedback to users and developers:

- **HTTP Status Codes**: Responses are accompanied by appropriate HTTP status codes to indicate success or failure (e.g., 200 for success, 400 for bad request, 401 for unauthorized access, 500 for internal server error).
- **Exception Handling**: Custom exceptions are used to handle specific error scenarios, such as unauthorized access or duplicate registrations, ensuring clarity in error messages.
- **Global Exception Handling**: A global exception handler intercepts unexpected errors, logging details for debugging purposes, and providing a consistent error response format.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java Development Kit (JDK) installed
- Node.js and npm (for frontend development)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd city-explorer-backend
