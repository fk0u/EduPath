"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function StepOne() {
    const { data, updateData, nextStep } = useOnboardingStore();

    const handleNext = () => {
        if (data.name && data.city) {
            nextStep();
        }
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Welcome! Let's get to know you.</CardTitle>
                <CardDescription>We need some basic details to personalize your experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">City / Region</Label>
                    <Input
                        id="city"
                        value={data.city}
                        onChange={(e) => updateData({ city: e.target.value })}
                        placeholder="e.g. Samarinda, Balikpapan"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="school">School Name</Label>
                    <Input
                        id="school"
                        value={data.school}
                        onChange={(e) => updateData({ school: e.target.value })}
                        placeholder="e.g. SMAN 1 Samarinda"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleNext} disabled={!data.name || !data.city}>
                    Next Step
                </Button>
            </CardFooter>
        </>
    );
}
