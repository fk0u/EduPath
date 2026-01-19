"use server";

import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const SignupSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export async function signup(prevState: string | undefined, formData: FormData) {
    const validation = SignupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validation.success) {
        return "Invalid input.";
    }

    const { name, email, password } = validation.data;

    try {
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return "User already exists.";
        }

        const hashedPassword = await hash(password, 10);

        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: "student",
        });

        // Redirect or Sign In automatically
        // await signIn("credentials", { email, password, redirect: false });

    } catch (error) {
        console.error("Signup error:", error);
        return "Failed to create account.";
    }

    redirect("/login");
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
