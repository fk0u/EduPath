"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { OnboardingData } from "@/hooks/use-onboarding-store";
import { redirect } from "next/navigation";

export async function submitOnboarding(data: OnboardingData) {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        throw new Error("Unauthorized");
    }

    // Get User ID from DB based on email (since session.user.id might not be populated depending on strategy)
    // But usually create-next-app with drift? Session should have ID if we adjust callback.
    // For now, let's fetch user by email to be safe.
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, session.user!.email!)
    });

    if (!user) {
        throw new Error("User not found");
    }

    await db.insert(profiles).values({
        userId: user.id,
        city: data.city,
        school: data.school,
        grade: data.grade,
        major: data.major,
        grades: data.grades,
        utbkScore: data.utbkScore,
        interestResult: data.interestResult,
        budget: data.budget,
        pathways: data.pathways,
    });

    // Revalidate or redirect
}
