"use client";

import { useState, useEffect } from "react";
import { timelineData, targetDate, targetLabel } from "@/data/timeline";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer, Calendar, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default function TimelinePage() {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container mx-auto py-12 px-4 max-w-5xl">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">Menuju SNBP 2026</h1>
                <p className="text-muted-foreground text-lg">Pantau jadwal penting seleksi masuk perguruan tinggi negeri.</p>
            </div>

            {/* Countdown Hero */}
            <div className="mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-xl max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-blue-200">
                            <Timer className="w-5 h-5" />
                            <span className="font-semibold uppercase tracking-wider text-sm">Hitung Mundur</span>
                        </div>
                        <h2 className="text-3xl font-bold">{targetLabel}</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-center">
                        {timeLeft ? (
                            <>
                                <div className="bg-white/10 backdrop-blur rounded-lg p-3 min-w-[70px]">
                                    <div className="text-3xl font-bold">{timeLeft.days}</div>
                                    <div className="text-xs text-blue-200 uppercase">Hari</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-lg p-3 min-w-[70px]">
                                    <div className="text-3xl font-bold">{timeLeft.hours}</div>
                                    <div className="text-xs text-blue-200 uppercase">Jam</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-lg p-3 min-w-[70px]">
                                    <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                                    <div className="text-xs text-blue-200 uppercase">Menit</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur rounded-lg p-3 min-w-[70px]">
                                    <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                                    <div className="text-xs text-blue-200 uppercase">Detik</div>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-4 text-xl">Loading...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Timeline Steps */}
            <div className="relative border-l border-muted ml-4 md:ml-12 space-y-12">
                {timelineData.map((item, index) => (
                    <div key={item.id} className="relative pl-8 md:pl-12">
                        {/* Connector Line/Dot */}
                        <div className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border ring-4 ring-background ${item.status === "done" ? "bg-green-500 border-green-500" :
                                item.status === "active" ? "bg-blue-600 border-blue-600 animate-pulse" :
                                    "bg-muted border-muted-foreground"
                            }`} />

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 group">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                                        {item.date}
                                    </span>
                                    {item.status === "active" && (
                                        <Badge variant="default" className="bg-blue-600">Sedang Berlangsung</Badge>
                                    )}
                                </div>
                                <h3 className={`text-xl font-bold ${item.status === "upcoming" ? "text-muted-foreground" : ""}`}>
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground max-w-2xl">
                                    {item.description}
                                </p>
                            </div>

                            {/* Action Button mostly decorative for MVP */}
                            {item.status === "active" && (
                                <Badge variant="outline" className="w-fit gap-1 pr-3 py-1 cursor-pointer hover:bg-slate-100">
                                    Cek Info <ArrowRight className="h-3 w-3" />
                                </Badge>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
