"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import universities from "@/data/universities.json";
import { Check, Coins, Trophy, GraduationCap, Building2, Calculator, ArrowRight } from "lucide-react";

type SubjectGrades = {
    matematika: number;
    bahasaIndo: number;
    bahasaInggris: number;
    kejuruan: number;
    lainnya: number; // Average of other subjects
};

type AllGrades = Record<number, SubjectGrades | number>; // number if PKL

export default function CalculatorPage() {
    const [level, setLevel] = useState<"SMA" | "SMK">("SMA");
    const [pklSemester, setPklSemester] = useState<string>("none");
    const [grades, setGrades] = useState<AllGrades>({
        1: { matematika: 0, bahasaIndo: 0, bahasaInggris: 0, kejuruan: 0, lainnya: 0 },
        2: { matematika: 0, bahasaIndo: 0, bahasaInggris: 0, kejuruan: 0, lainnya: 0 },
        3: { matematika: 0, bahasaIndo: 0, bahasaInggris: 0, kejuruan: 0, lainnya: 0 },
        4: { matematika: 0, bahasaIndo: 0, bahasaInggris: 0, kejuruan: 0, lainnya: 0 },
        5: { matematika: 0, bahasaIndo: 0, bahasaInggris: 0, kejuruan: 0, lainnya: 0 },
    });
    const [targetUniId, setTargetUniId] = useState<string>("");
    const [targetProdiName, setTargetProdiName] = useState<string>("");

    const updateGrade = (sem: number, subject: keyof SubjectGrades, value: number) => {
        setGrades(prev => ({
            ...prev,
            [sem]: {
                ...(prev[sem] as SubjectGrades),
                [subject]: value
            }
        }));
    };

    const updatePklGrade = (sem: number, value: number) => {
        setGrades(prev => ({
            ...prev,
            [sem]: value
        }));
    }

    // Calculate Average Per Semester and Total
    const averages = useMemo(() => {
        let semesterAvgs: Record<number, number> = {};
        let totalScore = 0;
        let count = 0;

        for (let i = 1; i <= 5; i++) {
            const g = grades[i];
            let semAvg = 0;

            if (typeof g === "number") {
                // It's a PKL grade
                semAvg = g;
            } else {
                // It's subject grades
                // For MVP simple average: (Mtk + Indo + Ing + Kejuruan + Lainnya) / 5
                // Adjust divisor if some fields are 0? No, assume scale 0-100.
                // Note: Kejuruan might only apply to SMK. For SMA maybe IPA/IPS. 
                // Let's simplify: Sum non-zero / count non-zero? Or fixed 5 subjects.
                // Fixed 5 subjects for simplicity in this MVP.
                let sum = g.matematika + g.bahasaIndo + g.bahasaInggris + g.lainnya;
                let divisor = 4;
                if (level === "SMK") {
                    sum += g.kejuruan;
                    divisor = 5;
                }
                semAvg = sum / divisor;
            }

            semesterAvgs[i] = semAvg;
            totalScore += semAvg;
            count++;
        }

        return {
            semesters: semesterAvgs,
            final: count === 0 ? 0 : totalScore / count
        };
    }, [grades, level, pklSemester]);

    // Prediction Logic
    const prediction = useMemo(() => {
        if (!targetUniId) return null;
        const uni = universities.find(u => u.id === targetUniId);
        if (!uni) return null;

        // Find specific prodi passing grade if selected, else use general uni passing grade
        let passingGrade = uni.passing_grade || 75;
        if (targetProdiName && uni.top_prodi) {
            const prodi = uni.top_prodi.find(p => p.name === targetProdiName);
            if (prodi) passingGrade = prodi.passing_grade;
        }

        const diff = averages.final - passingGrade;

        if (diff >= 5) return { label: "Sangat Berpeluang", color: "text-green-600", bg: "bg-green-100", bar: "bg-green-600", chance: 90 };
        if (diff >= 2) return { label: "Berpeluang Besar", color: "text-emerald-600", bg: "bg-emerald-100", bar: "bg-emerald-600", chance: 75 };
        if (diff >= -2) return { label: "Kompetitif / Cukup", color: "text-blue-600", bg: "bg-blue-100", bar: "bg-blue-600", chance: 50 };
        if (diff >= -5) return { label: "Butuh Kerja Keras", color: "text-orange-600", bg: "bg-orange-100", bar: "bg-orange-600", chance: 30 };

        // Smart Recommendations Logic
        const recs = [];
        // 1. Same Major, Different Uni (Lower Grade)
        if (targetProdiName) {
            const similarProdis = universities.flatMap(u =>
                (u.top_prodi || [])
                    .filter(p => p.name.includes(targetProdiName) || targetProdiName.includes(p.name))
                    .map(p => ({ uni: u.name, ...p }))
            ).filter(p => p.passing_grade <= averages.final && p.uni !== uni.name).slice(0, 2);

            if (similarProdis.length > 0) recs.push(...similarProdis);
        }

        // 2. Different Major, Same Uni (Lower Grade)
        if (uni.top_prodi) {
            const easierProdis = uni.top_prodi
                .filter(p => p.passing_grade <= averages.final && p.name !== targetProdiName)
                .slice(0, 2);
            if (easierProdis.length > 0) recs.push(...easierProdis);
        }

        return {
            label: "Sulit",
            color: "text-red-600",
            bg: "bg-red-50",
            bar: "bg-red-600",
            chance: 15,
            recommendations: recs
        };
    }, [averages.final, targetUniId, targetProdiName]);

    const targetUni = universities.find(u => u.id === targetUniId);

    return (
        <div className="container mx-auto py-12 px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8">

                {/* LEFT COLUMN: CALCULATOR */}
                <div className="w-full md:w-2/3 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Kalkulator Rapor</h1>
                        <p className="text-muted-foreground">Input nilai detail per mata pelajaran untuk hasil akurat.</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Konfigurasi Siswa</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Jenjang</Label>
                                    <Select onValueChange={(v: "SMA" | "SMK") => setLevel(v)} defaultValue="SMA">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SMA">SMA / MA</SelectItem>
                                            <SelectItem value="SMK">SMK</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {level === "SMK" && (
                                    <div className="space-y-2">
                                        <Label>Semester PKL</Label>
                                        <Select onValueChange={setPklSemester} defaultValue="none">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Belum PKL</SelectItem>
                                                <SelectItem value="4">Semester 4</SelectItem>
                                                <SelectItem value="5">Semester 5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            {[1, 2, 3, 4, 5].map(sem => (
                                <AccordionItem key={sem} value={`item-${sem}`}>
                                    <AccordionTrigger className="text-lg font-semibold px-4 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-t-lg">
                                        Semester {sem}
                                        <span className="ml-auto mr-4 text-sm font-normal text-muted-foreground">
                                            Rata-rata: {averages.semesters[sem].toFixed(2)}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border-t">
                                        {level === "SMK" && pklSemester === sem.toString() ? (
                                            <div className="space-y-2">
                                                <Label>Nilai Laporan PKL / Magang</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0-100"
                                                    className="max-w-xs"
                                                    onChange={(e) => updatePklGrade(sem, parseFloat(e.target.value) || 0)}
                                                />
                                                <p className="text-sm text-slate-500">Nilai PKL menggantikan seluruh mata pelajaran semester ini.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Matematika</Label>
                                                    <Input type="number" onChange={(e) => updateGrade(sem, 'matematika', parseFloat(e.target.value) || 0)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Bahasa Indonesia</Label>
                                                    <Input type="number" onChange={(e) => updateGrade(sem, 'bahasaIndo', parseFloat(e.target.value) || 0)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Bahasa Inggris</Label>
                                                    <Input type="number" onChange={(e) => updateGrade(sem, 'bahasaInggris', parseFloat(e.target.value) || 0)} />
                                                </div>
                                                {level === "SMK" && (
                                                    <div className="space-y-2">
                                                        <Label>Kompetensi Kejuruan</Label>
                                                        <Input type="number" onChange={(e) => updateGrade(sem, 'kejuruan', parseFloat(e.target.value) || 0)} />
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <Label>Rata-rata Mapel Lainnya</Label>
                                                    <Input type="number" onChange={(e) => updateGrade(sem, 'lainnya', parseFloat(e.target.value) || 0)} />
                                                </div>
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                {/* RIGHT COLUMN: PREDICTION & SUMMARY */}
                <div className="w-full md:w-1/3 space-y-6">

                    {/* Score Summary */}
                    <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white/90">
                                <Calculator className="h-5 w-5" />
                                Nilai Akhir
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-extrabold mb-2">{averages.final.toFixed(2)}</div>
                            <p className="text-blue-100 text-sm">Rata-rata kumulatif Semester 1 - 5</p>
                        </CardContent>
                    </Card>

                    {/* Target Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Cek Peluang</CardTitle>
                            <CardDescription>Pilih Kampus & Prodi Impian</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Universitas</Label>
                                <Select onValueChange={setTargetUniId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kampus" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {universities.map(u => (
                                            <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {targetUni && targetUni.top_prodi && (
                                <div className="space-y-2">
                                    <Label>Program Studi (Opsional)</Label>
                                    <Select onValueChange={(val) => setTargetProdiName(val === "general" ? "" : val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Prodi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">-- Hanya Universitas --</SelectItem>
                                            {targetUni.top_prodi.map(p => (
                                                <SelectItem key={p.name} value={p.name}>
                                                    {p.name} (Grade: {p.passing_grade})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </CardContent>
                        {prediction && (
                            <CardFooter className={`${prediction.bg} border-t flex flex-col items-start gap-4 p-6 animate-in fade-in slide-in-from-bottom-5`}>
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`font-bold text-lg ${prediction.color}`}>{prediction.label}</span>
                                        <span className="text-sm font-mono font-bold">{prediction.chance}%</span>
                                    </div>
                                    <Progress value={prediction.chance} className={`h-3 w-full bg-white/50 [&>div]:${prediction.bar}`} />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Butuh rata-rata: <strong>{targetProdiName ? universities.find(u => u.id === targetUniId)?.top_prodi?.find(p => p.name === targetProdiName)?.passing_grade : universities.find(u => u.id === targetUniId)?.passing_grade}</strong>
                                    </p>
                                </div>

                                {/* Smart Recommendations Display */}
                                {prediction.recommendations && prediction.recommendations.length > 0 && (
                                    <div className="w-full mt-2 pt-4 border-t border-red-200">
                                        <div className="flex items-center gap-2 mb-3 text-red-800 font-semibold text-sm">
                                            <Trophy className="h-4 w-4" />
                                            Rekomendasi Pintar ("Safety Net")
                                        </div>
                                        <div className="space-y-2">
                                            {prediction.recommendations.map((rec: any, idx: number) => (
                                                <div key={idx} className="bg-white p-3 rounded-lg border shadow-sm text-sm flex justify-between items-center">
                                                    <div>
                                                        <div className="font-medium text-slate-800">{rec.name}</div>
                                                        <div className="text-xs text-slate-500">{rec.uni || "Jurusan Lain di Kampus Ini"}</div>
                                                    </div>
                                                    <div className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded">
                                                        Pass: {rec.passing_grade}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardFooter>
                        )}
                    </Card>

                </div>
            </div>
        </div >
    );
}
