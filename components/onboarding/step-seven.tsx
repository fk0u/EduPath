"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PATHWAYS = [
    { id: "PTN", label: "PTN (Universitas Negeri)" },
    { id: "PTS", label: "PTS (Universitas Swasta)" },
    { id: "International", label: "International Universities" },
    { id: "Kedinasan", label: "Sekolah Kedinasan" },
];

export function StepSeven() {
    const { data, updateData, prevStep } = useOnboardingStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleToggle = (id: string) => {
        const current = data.pathways;
        if (current.includes(id)) {
            updateData({ pathways: current.filter(p => p !== id) });
        } else {
            updateData({ pathways: [...current, id] });
        }
    };

    const handleFinish = async () => {
        setIsSubmitting(true);
        try {
            // LocalStorage Persistence
            window.localStorage.setItem("edupath-profile", JSON.stringify(data));
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            router.push("/dashboard");
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Preferred Pathways</CardTitle>
                <CardDescription>Which options are you considering?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {PATHWAYS.map(p => (
                    <div key={p.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={p.id}
                            checked={data.pathways.includes(p.id)}
                            onCheckedChange={() => handleToggle(p.id)}
                        />
                        <Label htmlFor={p.id}>{p.label}</Label>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                    Back
                </Button>
                <Button onClick={handleFinish} disabled={data.pathways.length === 0 || isSubmitting}>
                    {isSubmitting ? "Saving..." : "Finish Setup"}
                </Button>
            </CardFooter>
        </>
    );
}
