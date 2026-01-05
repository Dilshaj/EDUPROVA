console.log('API Client Module Loaded');
import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    headers: {},
});

apiClient.interceptors.request.use(async (config) => {
    console.log('API Client: Intercepting request to', config.url);
    if (typeof window !== 'undefined') {
        const session = await getSession();
        console.log('API Client: Session check', {
            hasSession: !!session,
            hasToken: !!(session as any)?.accessToken,
            tokenSnippet: (session as any)?.accessToken ? (session as any).accessToken.substring(0, 10) + '...' : 'none'
        });
        if (session && (session as any).accessToken) {
            config.headers.Authorization = `Bearer ${(session as any).accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if it's a network error (backend not reachable)
        if (!error.response) {
            console.error('API Client: Network Error - Backend not reachable', {
                url: error.config?.url,
                method: error.config?.method,
                message: error.message,
                code: error.code,
                baseURL: apiClient.defaults.baseURL
            });

            // Add a user-friendly error message
            error.userMessage = 'Unable to connect to the server. Please ensure the backend is running.';
        } else {
            // It's an HTTP error (4xx, 5xx)
            console.error('API Client: HTTP Error', {
                url: error.config?.url,
                method: error.config?.method,
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                headers: error.response.headers
            });

            // Add specific error messages for common status codes
            if (error.response.status === 401) {
                error.userMessage = 'Authentication failed. Please log in again.';
            } else if (error.response.status === 403) {
                error.userMessage = 'You do not have permission to access this resource.';
            } else if (error.response.status === 404) {
                error.userMessage = 'The requested resource was not found.';
            } else if (error.response.status >= 500) {
                error.userMessage = 'Server error. Please try again later.';
            } else {
                error.userMessage = error.response.data?.message || 'An error occurred.';
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
