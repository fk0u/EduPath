"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

const QUESTIONS = [
    { id: 1, text: "I enjoy working with machines or tools." },
    { id: 2, text: "I like solving complex problems or puzzles." },
    { id: 3, text: "I express myself through art or writing." },
    { id: 4, text: "I like helping people learn or grow." },
    { id: 5, text: "I enjoy leading teams or selling ideas." },
];

export function StepFive() {
    const { updateData, nextStep, prevStep } = useOnboardingStore();
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleNext = () => {
        // Simple logic: just save 'completed' for now or a dummy RIASEC code
        updateData({ interestResult: "RIASEC-Mock" });
        nextStep();
    };

    const handleAnswer = (qid: number, val: string) => {
        setAnswers(prev => ({ ...prev, [qid]: val }));
    };

    const allAnswered = QUESTIONS.every(q => answers[q.id]);

    return (
        <>
            <CardHeader>
                <CardTitle>Interest Assessment</CardTitle>
                <CardDescription>Quick check! Do you Agree or Disagree?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {QUESTIONS.map((q) => (
                    <div key={q.id} className="space-y-2">
                        <p className="text-sm font-medium">{q.text}</p>
                        <RadioGroup
                            onValueChange={(val) => handleAnswer(q.id, val)}
                            className="flex space-x-4"
                            value={answers[q.id]}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="agree" id={`q${q.id}-agree`} />
                                <Label htmlFor={`q${q.id}-agree`}>Agree</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="disagree" id={`q${q.id}-disagree`} />
                                <Label htmlFor={`q${q.id}-disagree`}>Disagree</Label>
                            </div>
                        </RadioGroup>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!allAnswered}>
                    Next Step
                </Button>
            </CardFooter>
        </>
    );
}
