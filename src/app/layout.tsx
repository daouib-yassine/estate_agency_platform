import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // This creates a CSS variable
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant", // This creates a CSS variable
});

export const metadata: Metadata = {
  title: "Altis Realty | Premium Real Estate",
  description: "Your trusted partner in premium real estate since 1998.",
};

export default function RootLayout({
  children,
}: {} & React.PropsWithChildren) {
  return (
    <html lang="en" className="scroll-smooth">

      <body className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased`}
       suppressHydrationWarning={true}
       >
        {children}
      </body>
    </html>
  );
}
