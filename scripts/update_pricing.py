import re

with open('src/app/(public)/servicecharges/components/PricingSection.tsx', 'r') as f:
    content = f.read()

# 1. Add imports
content = content.replace('import { PRICING_STREAMS } from "@/constants/pages/pricingData";', 'import { PRICING_STREAMS } from "@/constants/pages/pricingData";\nimport { useCountry } from "@/context/CountryContext";\nimport { useEffect } from "react";')

# 2. Add exchange rates map inside or outside
rates_map = """
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CNY: 7.24,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  BHD: 0.38,
  CHF: 0.90,
  SEK: 10.5,
  SGD: 1.35,
  AUD: 1.53,
  NZD: 1.66,
  JPY: 153.0,
  KRW: 1370.0,
  MYR: 4.7,
  IDR: 16000.0,
  THB: 37.0,
  ZAR: 18.5,
  MXN: 17.0,
  BRL: 5.1,
  CAD: 1.37,
};

"""
content = content.replace('export default function PricingSection() {', rates_map + 'export default function PricingSection() {')

# 3. Replace state and formatting functions
new_state = """
  const { countryConfig } = useCountry();
  const userCurrency = countryConfig?.currency || "USD";
  const userSymbol = countryConfig?.currencySymbol || "$";
  const hasLocalCurrency = userCurrency !== "USD" && userCurrency !== "INR"; // If it's INR, we treat it separately if needed, but wait, India is redirected. Let's just say != "USD"

  const [showUSD, setShowUSD] = useState(!hasLocalCurrency);

  useEffect(() => {
    setShowUSD(userCurrency === "USD");
  }, [userCurrency]);

  const formatCurrency = (pkg: any, useUSD: boolean) => {
    if (useUSD) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(pkg.priceUSD);
    }
    
    // If it's INR, use the hardcoded INR price.
    if (userCurrency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(pkg.priceINR);
    }
    
    // Otherwise calculate dynamically from USD
    const rate = EXCHANGE_RATES[userCurrency] || 1;
    const localValue = pkg.priceUSD * rate;
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: userCurrency,
      maximumFractionDigits: 0,
    }).format(localValue);
  };
"""

content = re.sub(r'const \[isUSD, setIsUSD\] = useState\(false\);[\s\S]*?maximumFractionDigits: 0,\n    \}\)\.format\(value\);\n  \};', new_state.strip(), content)

# 4. Replace the Toggle buttons
old_toggle = """<div className="flex bg-primary/5 p-1 rounded-full border border-primary/10">
              <button
                onClick={() => setIsUSD(false)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  !isUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                INR ₹
              </button>
              <button
                onClick={() => setIsUSD(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  isUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                USD $
              </button>
            </div>"""

new_toggle = """<div className="flex bg-primary/5 p-1 rounded-full border border-primary/10">
              <button
                onClick={() => setShowUSD(false)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  !showUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                {userCurrency} {userSymbol}
              </button>
              <button
                onClick={() => setShowUSD(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  showUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                USD $
              </button>
            </div>"""

content = content.replace(old_toggle, new_toggle)

# 5. Replace price displays
# {isUSD ? formatUSD(pkg.priceUSD) : formatINR(pkg.priceINR)}
content = content.replace('{isUSD\n                              ? formatUSD(pkg.priceUSD)\n                              : formatINR(pkg.priceINR)}', '{formatCurrency(pkg, showUSD)}')
# {isUSD ? formatINR(pkg.priceINR) : formatUSD(pkg.priceUSD)}
content = content.replace('{isUSD\n                              ? formatINR(pkg.priceINR)\n                              : formatUSD(pkg.priceUSD)}', '{formatCurrency(pkg, !showUSD)}')

with open('src/app/(public)/servicecharges/components/PricingSection.tsx', 'w') as f:
    f.write(content)
