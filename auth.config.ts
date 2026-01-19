import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // Allow access to everything for the No-Login MVP
            return true;
        },
    },
} satisfies NextAuthConfig;
