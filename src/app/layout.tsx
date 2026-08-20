import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "oitocloud — Deploy at the speed of thought",
  description:
    "White-labeled cloud hosting, automated deployments, and domain routing — all from one platform. Push code, go live in seconds.",
  keywords: ["cloud hosting", "PaaS", "deployment", "white-label", "oitocloud"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col noise">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
