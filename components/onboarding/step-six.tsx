"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function StepSix() {
    const { data, updateData, nextStep, prevStep } = useOnboardingStore();

    return (
        <>
            <CardHeader>
                <CardTitle>Budget Preferences</CardTitle>
                <CardDescription>What is your estimated budget for tuition fees?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <RadioGroup value={data.budget} onValueChange={(val: any) => updateData({ budget: val })}>
                    <div className="flex items-center space-x-2 disabled:opacity-50">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Economy (Subsidized / &lt; 5jt/sem)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Standard (5jt - 15jt/sem)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">Premium (&gt; 15jt/sem)</Label>
                    </div>
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={nextStep} disabled={!data.budget}>
                    Next Step
                </Button>
            </CardFooter>
        </>
    );
}
