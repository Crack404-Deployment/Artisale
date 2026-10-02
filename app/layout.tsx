// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artisale | Luxury Marketplace",
  description: "Exclusive luxury creations from master artisans worldwide.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%23121212'/><text x='50%' y='68%' font-family='Georgia, serif' font-size='60' font-weight='bold' fill='%23E5C158' text-anchor='middle'>A</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-eerie-1 text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}