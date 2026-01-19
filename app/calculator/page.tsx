"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import universities from "@/data/universities.json";
import { Check, Coins, Trophy, GraduationCap, Building2 } from "lucide-react";

export default function CalculatorPage() {
    const [level, setLevel] = useState<"SMA" | "SMK">("SMA");
    const [pklSemester, setPklSemester] = useState<string>("none"); // "4", "5", or "none"
    const [grades, setGrades] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const [pklGrade, setPklGrade] = useState<number>(0);
    const [targetUniId, setTargetUniId] = useState<string>("");

    // Calculate Average
    const averageScore = useMemo(() => {
        let total = 0;
        let count = 0;

        for (let i = 1; i <= 5; i++) {
            if (level === "SMK" && pklSemester === i.toString()) {
                total += pklGrade;
            } else {
                total += grades[i] || 0;
            }
            count++;
        }
        return count === 0 ? 0 : total / count;
    }, [grades, pklGrade, level, pklSemester]);

    // Prediction Logic
    const prediction = useMemo(() => {
        if (!targetUniId) return null;
        const uni = universities.find(u => u.id === targetUniId);
        if (!uni || !uni.passing_grade) return null;

        const diff = averageScore - uni.passing_grade;

        if (diff >= 5) return { label: "Sangat Berpeluang", color: "text-green-600", bg: "bg-green-100", chance: 95 };
        if (diff >= 0) return { label: "Berpeluang", color: "text-blue-600", bg: "bg-blue-100", chance: 75 };
        if (diff >= -5) return { label: "Butuh Kerja Keras", color: "text-orange-600", bg: "bg-orange-100", chance: 45 };
        return { label: "Sulit / Kompetitif", color: "text-red-600", bg: "bg-red-100", chance: 20 };
    }, [averageScore, targetUniId]);

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Kalkulator Peluang Masuk Kampus
                </h1>
                <p className="text-muted-foreground">Hitung rata-rata nilaimu (Semester 1-5) dan cek peluangmu di PTN/PTS impian.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* INPUT SECTION */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Input Nilai</CardTitle>
                        <CardDescription>Masukkan data nilaimu dengan jujur.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Level Selection */}
                        <div className="space-y-3">
                            <Label>Jenjang Pendidikan</Label>
                            <RadioGroup defaultValue="SMA" onValueChange={(v: "SMA" | "SMK") => setLevel(v)} className="flex space-x-4">
                                <div className="flex items-center space-x-2 border p-3 rounded-lg w-full justify-center has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 cursor-pointer">
                                    <RadioGroupItem value="SMA" id="sma" />
                                    <Label htmlFor="sma" className="cursor-pointer">SMA / MA</Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg w-full justify-center has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 cursor-pointer">
                                    <RadioGroupItem value="SMK" id="smk" />
                                    <Label htmlFor="smk" className="cursor-pointer">SMK</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* SMK PKL Logic */}
                        {level === "SMK" && (
                            <div className="space-y-3">
                                <Label>Semester berapa PKL?</Label>
                                <Select onValueChange={setPklSemester} defaultValue="none">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Semester PKL" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Tidak ada / Belum PKL</SelectItem>
                                        <SelectItem value="4">Semester 4</SelectItem>
                                        <SelectItem value="5">Semester 5</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Grades Inputs */}
                        <div className="grid grid-cols-1 gap-4">
                            {[1, 2, 3, 4, 5].map((sem) => (
                                <div key={sem} className="flex items-center justify-between">
                                    <Label className="w-1/3">
                                        Semester {sem} <br />
                                        {level === "SMK" && pklSemester === sem.toString() && <span className="text-blue-600 text-xs font-semibold">(Nilai PKL)</span>}
                                    </Label>
                                    <div className="w-2/3">
                                        {level === "SMK" && pklSemester === sem.toString() ? (
                                            <Input
                                                type="number"
                                                min="0" max="100"
                                                placeholder="Nilai Laporan PKL"
                                                onChange={(e) => setPklGrade(parseFloat(e.target.value) || 0)}
                                                className="border-blue-200 focus-visible:ring-blue-500"
                                            />
                                        ) : (
                                            <Input
                                                type="number"
                                                min="0" max="100"
                                                placeholder={`Rata-rata Sem ${sem}`}
                                                onChange={(e) => setGrades(prev => ({ ...prev, [sem]: parseFloat(e.target.value) || 0 }))}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </CardContent>
                </Card>

                {/* RESULT & PREDICTION SECTION */}
                <div className="space-y-6">

                    {/* Status Card */}
                    <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-inner">
                        <CardHeader>
                            <CardTitle className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">Rata-Rata Nilai Kamu</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-6xl font-extrabold text-blue-600 mb-2">
                                {averageScore.toFixed(2)}
                            </div>
                            <p className="text-sm text-muted-foreground">Basis perhitungan 5 semester</p>
                        </CardContent>
                    </Card>

                    {/* Prediction Tool */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                Cek Peluang Lolos
                            </CardTitle>
                            <CardDescription>Pilih kampus tujuan untuk melihat prediksi.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Select onValueChange={setTargetUniId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Universitas Tujuan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {universities.map(uni => (
                                        <SelectItem key={uni.id} value={uni.id}>
                                            {uni.name} ({uni.type})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {targetUniId && prediction && (
                                <div className={`p-4 rounded-xl border-2 border-dashed ${prediction.bg} text-center space-y-3 animate-in fade-in zoom-in duration-300`}>
                                    <h3 className={`text-lg font-bold ${prediction.color}`}>{prediction.label}</h3>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span>Peluang</span>
                                            <span>{prediction.chance}%</span>
                                        </div>
                                        <Progress value={prediction.chance} className={`h-3 ${prediction.color}`} />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        *Prediksi berdasarkan data historis passing grade {new Date().getFullYear() - 1}.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="bg-slate-100 dark:bg-slate-800 p-4 rounded-b-xl text-xs text-muted-foreground flex gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Disclaimer: Ini adalah simulasi. Kelulusan asli dipengaruhi oleh indeks sekolah, prestasi alumni, dan persaingan tahun berjalan.
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </div>
    );
}
