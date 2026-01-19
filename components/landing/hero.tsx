import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="container mx-auto flex flex-col items-center justify-center py-20 text-center px-4 md:py-32">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
                Unlock Your Future with <span className="text-blue-600">EduPath</span>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground mb-10">
                AI-Powered navigator for Indonesian students. Explore PTN, PTS, Scholarships, and more—specifically tailored for Kalimantan Timur and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                    <Link href="#features">Learn More</Link>
                </Button>
            </div>
        </section>
    );
}
