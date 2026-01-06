import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import apiClient from "@/lib/api-client";

const providers: any[] = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
            remember: { label: "Remember Me", type: "text" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;

            try {
                const res = await apiClient.post("/auth/login", {
                    email: credentials.email,
                    password: credentials.password,
                });

                if (res.data && res.data.user) {
                    return {
                        id: res.data.user.id,
                        email: res.data.user.email,
                        name: `${res.data.user.firstName} ${res.data.user.lastName}`,
                        role: res.data.user.role,
                        accessToken: res.data.access_token,
                        remember: credentials.remember === "true",
                    };
                }
                return null;
            } catch (error) {
                console.error("Auth error:", error);
                return null;
            }
        },
    }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

export const authOptions: NextAuthOptions = {
    providers,
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    // Sync with backend
                    const res = await apiClient.post("/auth/social-login", {
                        email: user.email,
                        firstName: user.name?.split(" ")[0] || "",
                        lastName: user.name?.split(" ").slice(1).join(" ") || "",
                        googleId: user.id,
                        avatar: user.image,
                    });

                    if (res.data && res.data.user) {
                        // Update user object with backend data to prefer our DB over Google defaults
                        user.id = res.data.user.id;
                        user.name = `${res.data.user.firstName} ${res.data.user.lastName}`;
                        user.image = res.data.user.avatar;
                        (user as any).role = res.data.user.role;
                        (user as any).accessToken = res.data.access_token;
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error during social login sync:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account, trigger, session }) {
            // Handle session updates (when update() is called)
            if (trigger === "update" && session) {
                console.log("NextAuth JWT: Update triggered", session);
                if (session.user) {
                    // Merge the updated user data into the token
                    if (session.user.image !== undefined) {
                        token.picture = session.user.image;
                    }
                    if (session.user.name !== undefined) {
                        token.name = session.user.name;
                    }
                }
                return token;
            }

            // Handle initial sign-in
            if (user) {
                console.log("NextAuth JWT: Initial sign-in for user", {
                    id: user.id,
                    email: user.email,
                    hasAccessToken: !!(user as any).accessToken
                });
                token.id = user.id;
                token.role = (user as any).role;
                token.name = user.name;
                token.picture = user.image;
                token.remember = (user as any).remember;
                token.accessToken = (user as any).accessToken;

                // Handle Remember Me expiration upon sign in
                if (token.remember) {
                    token.exp = Math.floor(Date.now() / 1000) + 180 * 24 * 60 * 60; // 180 days (~6 months)
                } else {
                    token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours
                }
            }

            // For social logins, if we don't have a backend accessToken yet, 
            // the signIn callback should have set it on the 'user' object.
            // If it's still missing and it's not a credentials provider, we might have a problem.
            if (account && account.provider !== "credentials" && !token.accessToken) {
                console.warn("NextAuth JWT: Social login token missing backend accessToken. Falling back to provider token.");
                token.accessToken = account.access_token;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                (session as any).accessToken = token.accessToken;

                // Map token picture and name to session user
                if (token.picture) {
                    session.user.image = token.picture as string;
                }
                if (token.name) {
                    session.user.name = token.name as string;
                }

                console.log("NextAuth Session: Mapped token to session", {
                    tokenPicture: token.picture,
                    sessionImage: session.user.image,
                    tokenName: token.name,
                    sessionName: session.user.name
                });
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 180 * 24 * 60 * 60, // 180 days (~6 months)
    },
    secret: process.env.NEXTAUTH_SECRET || "development-secret-key-1234567890",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
