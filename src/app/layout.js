'use client';
import { Nabla } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const nabla = Nabla({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nabla.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
