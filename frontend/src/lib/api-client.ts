console.log('API Client Module Loaded');
import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    headers: {},
});

apiClient.interceptors.request.use(async (config) => {
    console.log('API Client: Intercepting request to', config.url);

    // List of endpoints that don't require authentication
    const publicEndpoints = [
        '/otp/phone/send-otp',
        '/auth/verify-pre-login',
        '/auth/register',
        '/auth/login',
        '/auth/social-login',
        '/auth/accept-invite',
        '/auth/validate-invite'
    ];

    // Check if this is a public endpoint
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    if (typeof window !== 'undefined' && !isPublicEndpoint) {
        const session = await getSession();
        console.log('API Client: Session check', {
            hasSession: !!session,
            hasToken: !!(session as any)?.accessToken,
            tokenSnippet: (session as any)?.accessToken ? (session as any).accessToken.substring(0, 10) + '...' : 'none'
        });
        if (session && (session as any).accessToken) {
            config.headers.Authorization = `Bearer ${(session as any).accessToken}`;
        }
    } else if (isPublicEndpoint) {
        console.log('API Client: Skipping auth for public endpoint:', config.url);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Create a detailed error log object
        const errorLog: any = {
            timestamp: new Date().toISOString(),
            message: error.message,
        };

        // Add config details if available
        if (error.config) {
            errorLog.url = error.config.url;
            errorLog.method = error.config?.method?.toUpperCase();
            errorLog.baseURL = error.config.baseURL || apiClient.defaults.baseURL;
            errorLog.fullURL = `${error.config.baseURL || apiClient.defaults.baseURL}${error.config.url}`;
        }

        // Check if it's a network error (backend not reachable)
        if (!error.response) {
            errorLog.type = 'Network Error';
            errorLog.code = error.code;
            errorLog.description = 'Backend not reachable';

            console.error('API Client: Network Error');
            console.error(JSON.stringify(errorLog, null, 2));

            // Add a user-friendly error message
            error.userMessage = 'Unable to connect to the server. Please ensure the backend is running.';
        } else {
            // It's an HTTP error (4xx, 5xx)
            errorLog.type = 'HTTP Error';
            errorLog.status = error.response.status;
            errorLog.statusText = error.response.statusText;
            errorLog.responseData = error.response.data;

            // Suppress console error for 'User already exists' and 'Recent invite already sent' as they are handled by modals
            const suppressorMessages = [
                'User with this email already exists',
                'An invite was already sent to this email in the last 24 hours. Please wait before sending another.'
            ];

            if (error.response.status === 400 && suppressorMessages.includes(error.response.data?.message)) {
                // Skip logging to keep console clean
            } else {
                console.error(`API Client: HTTP Error ${error.response.status} - ${error.response.data?.message || error.message}`);
                console.error(JSON.stringify(errorLog, null, 2));
            }

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
