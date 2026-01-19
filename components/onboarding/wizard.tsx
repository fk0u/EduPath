"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { StepFour } from "./step-four";
import { StepFive } from "./step-five";
import { StepSix } from "./step-six";
import { StepSeven } from "./step-seven";

import { Progress } from "@/components/ui/progress";

export function OnboardingWizard() {
    const { currentStep, totalSteps } = useOnboardingStore();
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-xl shadow-lg border">
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <div className="min-h-[400px]">
                {currentStep === 1 && <StepOne />}
                {currentStep === 2 && <StepTwo />}
                {currentStep === 3 && <StepThree />}
                {currentStep === 4 && <StepFour />}
                {currentStep === 5 && <StepFive />}
                {currentStep === 6 && <StepSix />}
                {currentStep === 7 && <StepSeven />}
            </div>
        </div>
    );
}
