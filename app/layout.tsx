import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/session-provider";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap"
});

export const metadata: Metadata = {
  title: "EduPulse SMS | Modern School Governance",
  description: "Next-generation multi-tenant school management SaaS platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
