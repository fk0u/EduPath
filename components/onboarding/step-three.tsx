"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const SUBJECTS = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris"];

export function StepThree() {
    const { data, updateData, nextStep, prevStep } = useOnboardingStore();

    const handleNext = () => {
        // Validate that all subjects have scores
        const allFilled = SUBJECTS.every(sub => data.grades[sub] !== undefined && data.grades[sub] > 0);
        if (allFilled) {
            nextStep();
        }
    };

    const handleGradeChange = (subject: string, value: string) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
            updateData({
                grades: {
                    ...data.grades,
                    [subject]: numValue
                }
            });
        }
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
                <CardDescription>Enter your average grades (0-100) for key subjects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {SUBJECTS.map((subject) => (
                    <div key={subject} className="space-y-2">
                        <Label htmlFor={subject}>{subject}</Label>
                        <Input
                            id={subject}
                            type="number"
                            min="0"
                            max="100"
                            value={data.grades[subject] || ''}
                            onChange={(e) => handleGradeChange(subject, e.target.value)}
                            placeholder="e.g. 85"
                        />
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!SUBJECTS.every(sub => data.grades[sub])}>
                    Next Step
                </Button>
            </CardFooter>
        </>
    );
}
