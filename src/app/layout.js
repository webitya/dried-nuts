import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Fusion of Dried Nuts | Healthy Bites and Happy Moments",
  description: "Premium selection of high-quality dried fruits and luxury nuts from Fusion of Dried Nuts Private Limited. Healthy bites and happy moments delivered pan-India.",
  keywords: "dried nuts, fusion of dried nuts, healthy living, premium nuts, luxury dried fruits, kolkata nuts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          {children}
          <div id="toast-root"></div>
        </Providers>
      </body>
    </html>
  );
}
