import { signOut } from "next-auth/react";

export const handleAuthError = async (error: any) => {
    // Check if error is related to token expiration 
    // This depends on how your backend returns the error. 
    // Usually 401 Unauthorized is returned.

    if (error?.status === 401 || error?.message?.includes('expired') || error?.message?.includes('Unauthorized')) {
        console.log("Session expired. Logging out...");

        // You might want to show a toast message here before redirecting
        // But strictly per request: "automatically logout the user and take to login page"

        await signOut({
            callbackUrl: "/login?error=SessionExpired",
            redirect: true
        });
    }
};
