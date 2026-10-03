"use client";

import { DiamondSeparator } from "./ui/DiamondSeparator";

const brands = [
  "Solaris Fine Jewels",
  "Aurelius Couture",
  "Maison de Luxe",
  "Velvet & Stone",
  "Aethelgard Horology",
  "Maison De Cuir",
  "Elysian Tailors",
  "Lumière Paris",
  "Novus Atelier",
  "Kronos & Co."
];

// We duplicate the array so the infinite scroll loops seamlessly without empty spaces
const marqueeBrands = [...brands, ...brands];

export const BrandName = () => {
  return (
    <section className="py-16 bg-smoky-3 border-y border-white/5 overflow-hidden">
      {/* 
        Inline styles for the marquee animation. 
        CSS is much smoother than JS-based animations for continuous scrolling.
      */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          display: flex;
          width: max-content;
        }
        /* Pauses the animation when hovering anywhere over the container */
        .pause-on-hover:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Section */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[4px] text-gold-crayola">
          Authentic Heritage
        </span>
        <div className="my-2 flex items-center justify-center space-x-3">
          <DiamondSeparator />
          <h2 className="font-forum text-3xl text-white md:text-4xl">Our Master Ateliers</h2>
          <DiamondSeparator />
        </div>
      </div>

      {/* Marquee Container with edge fade gradients */}
      <div className="pause-on-hover relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-smoky-3 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-smoky-3 after:to-transparent">
        <div className="animate-marquee flex items-center py-4">
          {marqueeBrands.map((brand, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-center cursor-pointer"
            >
              {/* Brand Name */}
              <span className="px-10 font-forum text-3xl md:text-4xl lg:text-5xl text-quicksilver/40 transition-colors duration-500 group-hover:text-gold-crayola whitespace-nowrap">
                {brand}
              </span>
              
              {/* Diamond Separator between brands */}
              <span className="text-gold-crayola/30 text-[10px]">
                ♦
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};