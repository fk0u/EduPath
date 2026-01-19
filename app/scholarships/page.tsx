"use client";

import { useState } from "react";
import scholarships from "@/data/scholarships.json";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ScholarshipsPage() {
    const [query, setQuery] = useState("");

    const filtered = scholarships.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.provider.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
                <h1 className="text-3xl font-bold mb-4">Cari Beasiswa</h1>
                <p className="text-muted-foreground mb-6">Temukan dukungan finansial yang tepat untuk studi kamu.</p>
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari beasiswa (KIP-K, BCA, Unggulan...)"
                        className="pl-10 h-10"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(s => (
                    <Card key={s.id} className="flex flex-col h-full hover:shadow-lg transition-all">
                        <div className={`h-2 w-full ${s.logo_color || "bg-slate-500"}`} />
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant={s.popular ? "default" : "secondary"}>{s.type}</Badge>
                                <span className="text-xs font-medium text-slate-500">{s.provider}</span>
                            </div>
                            <CardTitle className="text-xl">{s.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-1">Benefit:</p>
                                <p className="text-sm text-muted-foreground">{s.amount}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-1">Syarat:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside">
                                    {s.requirements.slice(0, 2).map((r, i) => (
                                        <li key={i} className="truncate">{r}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <div className="text-xs">
                                <span className="block text-muted-foreground">Deadline:</span>
                                <span className="font-semibold text-red-600">{s.deadline}</span>
                            </div>
                            <Button size="sm" variant="outline">Detail</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
