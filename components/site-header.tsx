"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calculator, Map, User } from "lucide-react";

export function SiteHeader() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                    <span className="hidden font-bold sm:inline-block">EduPath</span>
                </Link>
                <nav className="flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
                    <Link
                        href="/dashboard"
                        className={`transition-colors hover:text-foreground/80 ${isActive("/dashboard") ? "text-foreground" : "text-foreground/60"}`}
                    >
                        Explore
                    </Link>
                    <Link
                        href="/calculator"
                        className={`transition-colors hover:text-foreground/80 ${isActive("/calculator") ? "text-foreground" : "text-foreground/60"}`}
                    >
                        Calculator
                    </Link>
                    <Link
                        href="/onboarding"
                        className={`transition-colors hover:text-foreground/80 ${isActive("/onboarding") ? "text-foreground" : "text-foreground/60"}`}
                    >
                        Profile Setup
                    </Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    {/* Future: User Dropdown or Login Button if we want hybrid */}
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/onboarding">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Profile</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
