"use client";

import Link from "next/link";
import { Calculator, Calendar, Scale, ArrowRight, Coins } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickAccess() {
    const items = [
        {
            title: "Smart Calculator",
            desc: "Hitung peluang lolos SNBP berdasarkan nilai rapormu secara akurat.",
            icon: Calculator,
            href: "/calculator",
            color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
            btnText: "Cek Peluang"
        },
        {
            title: "SNBP 2026 Timeline",
            desc: "Jangan ketinggalan jadwal penting pendaftaran dan pengumuman.",
            icon: Calendar,
            href: "/timeline",
            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
            btnText: "Lihat Jadwal"
        },
        {
            title: "Scholarship Finder",
            desc: "Temukan bantuan biaya kuliah seperti KIP-K, LPDP, dan Beasiswa Kaltim.",
            icon: Coins,
            href: "/scholarships",
            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
            btnText: "Cari Beasiswa"
        },
        {
            title: "University Compare",
            desc: "Bandingkan 2-3 kampus idamanmu side-by-side untuk keputusan terbaik.",
            icon: Scale,
            href: "/compare",
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
            btnText: "Bandingkan"
        }
    ];

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Essential Tools</h2>
                    <p className="text-muted-foreground">Direct access to our most popular student utilities.</p>
                </div>
                <Button variant="ghost" asChild className="hidden md:flex">
                    <Link href="/explore">View all features <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, idx) => (
                    <Card key={idx} className="group hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden border-muted/60">
                        <div className={`h-2 w-full ${item.color.split(" ")[0].replace("/20", "")}`} />
                        <CardHeader>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription>{item.desc}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="ghost" className="w-full justify-between group-hover:bg-slate-100 dark:group-hover:bg-slate-800" asChild>
                                <Link href={item.href}>
                                    {item.btnText} <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
