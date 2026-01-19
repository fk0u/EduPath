import { OnboardingWizard } from "@/components/onboarding/wizard";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">EduPath Setup</h1>
                <p className="text-muted-foreground mt-2">Your journey starts here.</p>
            </div>
            <OnboardingWizard />
        </div>
    );
}
