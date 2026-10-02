// components/Newsletter.tsx
import { LuxuryButton } from "./ui/LuxuryButton";
import { DiamondSeparator } from "./ui/DiamondSeparator";

export const Newsletter = () => {
  return (
    <section className="relative overflow-hidden bg-smoky-1 py-24 border-t border-white/5">
      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
          Private Circle
        </span>
        <div className="my-3 flex items-center justify-center space-x-3">
          <DiamondSeparator />
          <h2 className="font-forum text-4xl text-white md:text-5xl">Unlock Private Allocations</h2>
          <DiamondSeparator />
        </div>
        <p className="mx-auto max-w-xl text-sm text-quicksilver mb-10">
          Subscribe to receive private invitations to limited artisan drops, bespoke order windows, and private auction viewings.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 border border-white/20 bg-eerie-1 px-5 py-3.5 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola"
            required
          />
          <LuxuryButton type="submit" variant="secondary">
            Join Circle
          </LuxuryButton>
        </form>
      </div>
    </section>
  );
};