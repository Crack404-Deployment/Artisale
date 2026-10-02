// components/BrandValues.tsx
import { ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified Authenticity",
    description: "Every artisan and creation undergoes rigorous multi-tier physical and provenance inspection.",
  },
  {
    icon: Truck,
    title: "White-Glove Insured Delivery",
    description: "Complimentary global express courier with full valuation insurance and signature verification.",
  },
  {
    icon: Headphones,
    title: "24/7 VIP Concierge",
    description: "Dedicated personal advisors available around the clock for bespoke requests and sourcing.",
  },
  {
    icon: Sparkles,
    title: "Digital Provenance Passports",
    description: "Encrypted digital certificates of ownership ensuring immutable lineage for rare pieces.",
  },
];

export const BrandValues = () => {
  return (
    <section className="border-y border-white/5 bg-smoky-2 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-6 rounded-sm border border-transparent transition-all duration-300 hover:border-gold-crayola/30 hover:bg-eerie-2/50"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold-crayola/40 bg-eerie-1 text-gold-crayola transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-forum text-xl text-white mb-2">{item.title}</h3>
                <p className="text-xs text-quicksilver leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};