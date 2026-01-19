import Link from "next/link";

export function CTA() {
    return (
        <footer className="border-t bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto py-12 px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold">EduPath</h3>
                    <p className="text-sm text-muted-foreground">© 2026 EduPath. Built for Students.</p>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary">Privacy</Link>
                    <Link href="#" className="hover:text-primary">Terms</Link>
                    <Link href="#" className="hover:text-primary">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
