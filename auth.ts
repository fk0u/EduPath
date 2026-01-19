import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(1) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    // MOCK AUTHENTICATION
                    // Always return a valid user object for any valid email format
                    const { email, password } = parsedCredentials.data;

                    return {
                        id: "mock-user-id",
                        name: email.split("@")[0], // Use part of email as name
                        email: email,
                        image: `https://ui-avatars.com/api/?name=${email.split("@")[0]}`,
                    };
                }
                return null;
            },
        }),
    ],
});
