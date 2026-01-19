
import { Users, GraduationCap, Building2, BookOpen } from "lucide-react";

export function StatsBar() {
    const stats = [
        { label: "Universities", value: "20+", icon: Building2, desc: "Top PTN & Private" },
        { label: "Prodi / Majors", value: "150+", icon: BookOpen, desc: "Detailed Info" },
        { label: "Scholarships", value: "10+", icon: GraduationCap, desc: "Verified Funds" },
        { label: "Students Helped", value: "1k+", icon: Users, desc: "Growing fast" },
    ];

    return (
        <section className="border-y bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                                <div className="text-xs text-muted-foreground/60 mt-1">{stat.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
