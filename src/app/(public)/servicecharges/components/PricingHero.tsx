import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";

export default function PricingHero() {
  return (
    <FullWidthSection
      backgroundColor="accent"
      className="pt-32 pb-8 md:pt-32 md:pb-12 relative overflow-hidden"
    >
      {/* Decorative background elements consistent with Obrive branding */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        <div className="lg:col-span-7">
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary sm:leading-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[90vw] sm:max-w-3xl md:max-w-4xl break-words text-balance mb-6 uppercase`}
          >
            Build what's next.
            <br />
            Know the investment.
          </h1>

          <p className="text-base sm:text-md max-w-[600px] font-medium text-secondary mb-10">
            Transparent starting prices for immersive experiences, digital
            products, software engineering and growth. Choose a stream, select a
            package and move into a clearly scoped engagement.
          </p>
        </div>

        <div className="lg:col-span-5 relative">
          {/* Obrive aesthetic card for project range */}
          <div className="bg-gradient-to-br from-primary to-[#0f2e2a] text-white p-8 md:p-10 rounded-[32px] relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute -right-20 -top-20 w-64 h-64 border border-accent/30 rounded-full opacity-50" />
            <div className="absolute -right-10 -top-10 w-48 h-48 border border-accent/20 rounded-full opacity-50" />

            <div className="relative z-10">
              <div className="text-white/80 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                PROJECT RANGE
              </div>
              <div
                className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl md:text-6xl mb-6`}
              >
                ₹1L — ₹7L+
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                Premium fixed packages for defined scopes. Enterprise,
                multi-platform and high-complexity projects move to a custom
                SOW.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FullWidthSection>
  );
}
