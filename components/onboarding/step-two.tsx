"use client";

import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function StepTwo() {
    const { data, updateData, nextStep, prevStep } = useOnboardingStore();

    const handleNext = () => {
        if (data.grade && data.major) {
            nextStep();
        }
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Academic Profile</CardTitle>
                <CardDescription>Tell us about your current education status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="grade">Current Grade</Label>
                    <Select value={data.grade} onValueChange={(val) => updateData({ grade: val })}>
                        <SelectTrigger id="grade">
                            <SelectValue placeholder="Select Grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">Class 10</SelectItem>
                            <SelectItem value="11">Class 11</SelectItem>
                            <SelectItem value="12">Class 12 / Gap Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="major">Major / Jurusan</Label>
                    <Select value={data.major} onValueChange={(val) => updateData({ major: val })}>
                        <SelectTrigger id="major">
                            <SelectValue placeholder="Select Major" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PPLG">PPLG (Software Engineering)</SelectItem>
                            <SelectItem value="TJKT">TJKT (Network Eng)</SelectItem>
                            <SelectItem value="DKV">DKV (Design)</SelectItem>
                            <SelectItem value="IPA">IPA (Science)</SelectItem>
                            <SelectItem value="IPS">IPS (Social)</SelectItem>
                            <SelectItem value="Lainnya">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!data.grade || !data.major}>
                    Next Step
                </Button>
            </CardFooter>
        </>
    );
}
