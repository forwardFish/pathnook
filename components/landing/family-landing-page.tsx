import { LandingFaqSection } from "./landing-faq";
import { LandingFeaturesSection } from "./landing-features";
import { LandingFooter } from "./landing-footer";
import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingHowItWorksSection } from "./landing-how-it-works";
import { LandingProofSection } from "./landing-proof";
import { LandingTrustStrip } from "./landing-trust-strip";
import { LandingUseCasesSection } from "./landing-use-cases";

export function FamilyLandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="overflow-x-clip bg-white">
        <LandingHero />
        <LandingTrustStrip />
        <LandingFeaturesSection />
        <LandingHowItWorksSection />
        <LandingProofSection />
        <LandingFaqSection />
        <LandingUseCasesSection />
      </main>
      <LandingFooter />
    </>
  );
}
