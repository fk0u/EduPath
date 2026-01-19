"use client";

import { useState } from "react";
import universities from "@/data/universities.json";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, BookOpen, GraduationCap } from "lucide-react";

export default function ExplorePage() {
    const [query, setQuery] = useState("");

    const results = query.length < 2 ? [] : universities.flatMap(uni =>
        (uni.top_prodi || [])
            .filter(prodi => prodi.name.toLowerCase().includes(query.toLowerCase()))
            .map(prodi => ({
                ...prodi,
                university: uni.name,
                uniCity: uni.location,
                uniType: uni.type
            }))
    );

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                    Cari Jurusan Impian
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                    Temukan kampus mana saja yang membuka jurusan/prodi pilihanmu dan lihat passing grade-nya.
                </p>

                <div className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Ketik nama jurusan... (contoh: Informatika, Kedokteran, Hukum)"
                        className="pl-12 h-12 text-lg rounded-full shadow-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                {query.length >= 2 && (
                    <p className="mb-4 text-sm text-muted-foreground">
                        Ditemukan <strong>{results.length}</strong> program studi yang cocok.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((item, idx) => (
                        <Card key={`${item.university}-${item.name}-${idx}`} className="hover:border-blue-300 transition-colors">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-xs font-semibold text-blue-600 mb-1 flex items-center gap-1">
                                            <GraduationCap className="h-3 w-3" /> {item.university}
                                        </div>
                                        <CardTitle className="text-lg">{item.name}</CardTitle>
                                        <CardDescription>{item.uniCity} • {item.uniType}</CardDescription>
                                    </div>
                                    <Badge variant={item.category === "Saintek" ? "default" : "secondary"}>
                                        {item.category}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center text-sm border-t pt-2 mt-2">
                                    <span className="text-muted-foreground">Passing Grade:</span>
                                    <span className="font-bold text-lg">{item.passing_grade}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {query.length > 0 && results.length === 0 && query.length >= 2 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>Tidak ditemukan jurusan dengan kata kunci "{query}".</p>
                        <p className="text-sm">Coba kata kunci lain atau periksa ejaan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
