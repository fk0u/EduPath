import { create } from 'zustand';

export type OnboardingData = {
    // Step 1: Personal Info
    name: string;
    city: string;
    school: string;

    // Step 2: Academic Info
    grade: string; // 10, 11, 12
    major: string; // PPLG, TJKT, IPA, IPS, etc.

    // Step 3: Grades (simplified for MVP)
    grades: Record<string, number>; // { math: 80, ... }

    // Step 4: UTBK
    utbkScore?: number;

    // Step 5: Interest
    interestResult?: string;

    // Step 6: Budget
    budget: 'low' | 'medium' | 'high' | '';

    // Step 7: Pathways
    pathways: string[]; // ['PTN', 'PTS', 'International']
};

interface OnboardingStore {
    currentStep: number;
    totalSteps: number;
    data: OnboardingData;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateData: (data: Partial<OnboardingData>) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
    currentStep: 1,
    totalSteps: 7,
    data: {
        name: '',
        city: '',
        school: '',
        grade: '',
        major: '',
        grades: {},
        pathways: [],
        budget: '',
    },
    setStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps) })),
    prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
    updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
}));
