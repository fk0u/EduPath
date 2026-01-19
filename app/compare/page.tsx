"use client";

import { useState } from "react";
import universities from "@/data/universities.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Search, GraduationCap } from "lucide-react";

export default function ComparePage() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            if (selectedIds.length < 3) {
                setSelectedIds(prev => [...prev, id]);
            }
        }
    };

    const selectedUniversities = universities.filter(u => selectedIds.includes(u.id));

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Bandingkan Kampus</h1>
                <p className="text-muted-foreground">Pilih hingga 3 kampus untuk melihat perbandingan side-by-side.</p>
            </div>

            {/* Selection Area */}
            <Card className="mb-8 max-w-3xl mx-auto">
                <CardContent className="pt-6">
                    <div className="flex gap-4 items-center">
                        <Select onValueChange={(val) => toggleSelection(val)} disabled={selectedIds.length >= 3}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tambahkan Kampus ke Perbandingan..." />
                            </SelectTrigger>
                            <SelectContent>
                                {universities.filter(u => !selectedIds.includes(u.id)).map(u => (
                                    <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {selectedUniversities.map(u => (
                            <Badge key={u.id} variant="secondary" className="pl-2 pr-1 py-1 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
                                {u.name}
                                <Button variant="ghost" size="icon" className="h-4 w-4 ml-2 hover:bg-transparent" onClick={() => toggleSelection(u.id)}>
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                        {selectedIds.length === 0 && <span className="text-sm text-muted-foreground italic">Belum ada kampus terpilih.</span>}
                    </div>
                </CardContent>
            </Card>

            {/* Comparison Table */}
            {selectedUniversities.length > 0 && (
                <div className="overflow-x-auto rounded-xl border shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                            <tr>
                                <th className="p-4 font-medium text-muted-foreground w-[200px]">Kriteria</th>
                                {selectedUniversities.map(u => (
                                    <th key={u.id} className="p-4 font-bold text-lg min-w-[250px]">{u.name} ({u.id.toUpperCase()})</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="p-4 font-medium text-slate-500">Lokasi</td>
                                {selectedUniversities.map(u => (
                                    <td key={u.id} className="p-4">{u.location}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-slate-500">Tipe</td>
                                {selectedUniversities.map(u => (
                                    <td key={u.id} className="p-4"><Badge variant="outline">{u.type}</Badge></td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-slate-500">Akreditasi</td>
                                {selectedUniversities.map(u => (
                                    <td key={u.id} className="p-4 font-semibold text-blue-600">{u.accreditation}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-slate-500">Est. Biaya</td>
                                {selectedUniversities.map(u => (
                                    <td key={u.id} className="p-4 capitalize">{u.cost_range}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-slate-500 align-top">Pass Grade (Avg)</td>
                                {selectedUniversities.map(u => (
                                    <td key={u.id} className="p-4">
                                        <div className="text-2xl font-bold">{u.passing_grade}</div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-slate-500 align-top">Prodi Unggulan</td>
                                {selectedUniversities.map(u => (
                                    <td key={u.id} className="p-4">
                                        <ul className="space-y-1">
                                            {u.top_prodi?.slice(0, 5).map(p => (
                                                <li key={p.name} className="flex justify-between text-xs">
                                                    <span>{p.name}</span>
                                                    <span className="font-mono text-muted-foreground">{p.passing_grade}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
