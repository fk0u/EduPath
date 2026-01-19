"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PortalHero() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/explore?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
                <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                        <Sparkles className="mr-2 h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Education Super App for Indonesia</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent dark:from-white dark:via-blue-100 dark:to-indigo-200">
                        Everything You Need for <br />
                        <span className="text-blue-600 dark:text-blue-400">Higher Education</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Find universities, calculate admission chances, and discover scholarships. All in one verified platform.
                    </p>
                </div>

                {/* Search Bar Portal Style */}
                <div className="w-full max-w-2xl relative group">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all opacity-0 group-hover:opacity-100" />
                    <form onSubmit={handleSearch} className="relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-full shadow-2xl p-2 transition-all hover:scale-[1.01] hover:shadow-blue-500/10 active:scale-[0.99]">
                        <Search className="ml-4 h-6 w-6 text-muted-foreground shrink-0" />
                        <Input
                            className="flex-1 border-none bg-transparent shadow-none px-4 text-lg h-12 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                            placeholder="Cari Kampus atau Jurusan (e.g., Kedokteran UI)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button type="submit" size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                            Search
                        </Button>
                    </form>
                </div>

                {/* Quick Tags */}
                <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                    <span>Popular:</span>
                    {["Informatika", "Kedokteran", "Hukum", "Manajemen", "Ilmu Komunikasi"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => router.push(`/explore?q=${tag}`)}
                            className="hover:text-blue-600 underline decoration-dotted underline-offset-4 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
