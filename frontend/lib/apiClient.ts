import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session && (session as any).accessToken) {
    // Note: You might need to add accessToken to the session object in callbacks
    config.headers.Authorization = `Bearer ${(session as any).accessToken}`;
  } else if (session) {
    // If you don't have a separate accessToken, you might be using the session token itself
    // However, NextAuth doesn't expose the JWT raw token to getSession() by default for security.
    // If the backend is verified by the same secret, you might pass something else or use cookies.
    // Given the constraints, I'll assume we want to pass the session info if possible, 
    // but usually, people add the JWT to the session object in the jwt/session callbacks.
  }
  return config;
});

export default apiClient;
