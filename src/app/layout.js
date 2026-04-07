import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Fusion of Dried Nuts | Healthy Bites and Happy Moments",
  description: "Premium handcrafted dried nuts and traditional snacks. Order online from Fusion of Dried Nuts Private Limited for authentic taste and healthy bites.",
  keywords: "dried nuts, fusion of dried nuts, healthy snacks, premium nuts, handcrafted snacks, kolkata snacks",
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
