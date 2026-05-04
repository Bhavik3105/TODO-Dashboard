import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const font = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Personal Dashboard",
  description: "A state-of-the-art secure personal task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${font.className} min-h-screen selection:bg-cyan-500/30 selection:text-cyan-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
