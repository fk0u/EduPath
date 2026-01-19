import { PortalHero } from "@/components/portal/portal-hero";
import { StatsBar } from "@/components/portal/stats-bar";
import { QuickAccess } from "@/components/portal/quick-access";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PortalHero />
      <StatsBar />
      <QuickAccess />
      <CTA />
    </div>
  );
}
