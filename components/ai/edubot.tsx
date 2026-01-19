"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
    role: "user" | "bot";
    text: string;
};

const KNOWLEDGE_BASE = [
    {
        keywords: ["halo", "hi", "hai", "selamat"],
        response: "Halo! Saya EduBot. Ada yang bisa saya bantu terkait SNBP, SNBT, atau Beasiswa?"
    },
    {
        keywords: ["snbp", "undangan", "jalur prestasi"],
        response: "SNBP 2026 diperkirakan buka pendaftaran pada Februari 2026. Pastikan nilai rapormu stabil di semester 1-5 ya!"
    },
    {
        keywords: ["snbt", "utbk", "tes"],
        response: "SNBT menggunakan skor UTBK. Tes biasanya dilaksanakan bulan Mei. Materi tes: TPS, Literasi Bing/Indo, dan Penalaran Matematika."
    },
    {
        keywords: ["kip", "kipk", "miskin", "biaya"],
        response: "KIP Kuliah menanggung biaya UKT dan memberi uang saku bulanan. Syarat utama: terdaftar di DTKS atau memiliki SKTM."
    },
    {
        keywords: ["ui", "ugm", "itb", "terbaik"],
        response: "UI, UGM, dan ITB adalah Top 3 PTN di Indonesia. Passing gradenya rata-rata di atas 88-90. Semangat ya!"
    },
    {
        keywords: ["kalkulator", "hitung", "peluang"],
        response: "Kamu bisa cek peluang lolosmu di menu 'Calculator'. Masukkan nilai rapormu semester 1-5 di sana."
    },
    {
        keywords: ["siapa", "kamu", "bot"],
        response: "Saya EduBot, asisten AI pintar dari EduPath yang siap bantu kamu 24/7!"
    }
];

export function EduBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Hai! Butuh info seputar kuliah? Tanya aku aja! 👋" }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulate AI thinking
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let response = "Maaf, aku belum mengerti itu. Coba tanya tentang 'SNBP', 'KIP', atau 'Jadwal'.";

            for (const item of KNOWLEDGE_BASE) {
                if (item.keywords.some(k => lowerInput.includes(k))) {
                    response = item.response;
                    break;
                }
            }

            setMessages(prev => [...prev, { role: "bot", text: response }]);
        }, 800);
    };

    if (!isOpen) {
        return (
            <Button
                size="icon"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 animate-bounce transition-all z-50 text-white"
                onClick={() => setIsOpen(true)}
            >
                <Bot className="h-8 w-8" />
            </Button>
        );
    }

    return (
        <Card className="fixed bottom-6 right-6 w-[350px] shadow-2xl z-50 animate-in slide-in-from-bottom-10 fade-in border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-blue-600 text-white rounded-t-xl p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6" />
                    <div>
                        <CardTitle className="text-sm font-bold">EduBot Assistant</CardTitle>
                        <p className="text-[10px] text-blue-100 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-blue-700 text-white h-8 w-8" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div ref={scrollRef} className="h-[350px] overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === "bot" ? "justify-start" : "justify-end"}`}>
                            <div className={`
                                max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm
                                ${m.role === "bot"
                                    ? "bg-white text-slate-800 rounded-tl-none border"
                                    : "bg-blue-600 text-white rounded-tr-none"}
                            `}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-3 border-t bg-white dark:bg-slate-950">
                <form onSubmit={handleSend} className="flex w-full gap-2">
                    <Input
                        placeholder="Tanya sesuatu..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="flex-1 focus-visible:ring-blue-500"
                    />
                    <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
