import "./globals.css";
import { Inter, Fraunces } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "DeerRidge RV Park | Ellerbe, North Carolina",
  description:
    "A peaceful RV retreat in Ellerbe, NC where southern hospitality meets modern convenience. Just off Exit 25 on I-74, near Rockingham Speedway and Pinehurst.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="cursor-none-desktop">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
