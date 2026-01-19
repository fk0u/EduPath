"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function StepFour() {
    const { data, updateData, nextStep, prevStep } = useOnboardingStore();

    return (
        <>
            <CardHeader>
                <CardTitle>UTBK / Tryout Score</CardTitle>
                <CardDescription>If you have taken a UTBK simulation, enter your average score. (Optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="utbk">Average Score</Label>
                    <Input
                        id="utbk"
                        type="number"
                        value={data.utbkScore || ''}
                        onChange={(e) => updateData({ utbkScore: parseFloat(e.target.value) || undefined })}
                        placeholder="e.g. 600"
                    />
                    <p className="text-xs text-muted-foreground">Leave blank if not available.</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={nextStep}>
                    Next Step
                </Button>
            </CardFooter>
        </>
    );
}
