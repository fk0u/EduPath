"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { OnboardingData } from "@/hooks/use-onboarding-store";
import universities from "@/data/universities.json";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<OnboardingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = window.localStorage.getItem("edupath-profile");
        if (stored) {
            setProfile(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="p-8 space-y-4">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                </div>
            </div>
        );
    }

    // Filter logic based on user profile
    const recommendedUnis = universities.filter(uni => {
        if (!profile) return true;

        // Simple mock matching logic
        const matchesBudget = profile.budget === "" || profile.budget === uni.cost_range;
        const matchesPathway = profile.pathways.length === 0 || profile.pathways.includes(uni.type);

        return matchesBudget || matchesPathway; // Loose matching for MVP to ensure results
    });

    return (
        <div className="p-8 container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Welcome, {session?.user?.name || profile?.name || "Student"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here are your personalized campus recommendations in Kalimantan Timur.
                    </p>
                </div>
                {profile?.major && <Badge variant="secondary" className="text-lg px-4 py-1">{profile.major}</Badge>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedUnis.map((uni) => (
                    <Card key={uni.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant={uni.type === "PTN" ? "default" : "outline"}>{uni.type}</Badge>
                                <span className="text-sm text-muted-foreground">{uni.location}</span>
                            </div>
                            <CardTitle className="mt-2">{uni.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{uni.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {uni.programs.slice(0, 3).map(prog => (
                                    <span key={prog} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        {prog}
                                    </span>
                                ))}
                                {uni.programs.length > 3 && <span className="text-xs text-muted-foreground self-center">+{uni.programs.length - 3} more</span>}
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-blue-600">Accreditation: {uni.accreditation}</span>
                                <a href={uni.website} target="_blank" className="text-primary hover:underline">Visit Website</a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {recommendedUnis.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No recommendations found matching your strict criteria. Try resetting your profile.
                    </div>
                )}
            </div>
        </div>
    );
}
