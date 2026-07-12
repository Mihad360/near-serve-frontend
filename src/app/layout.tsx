import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { DemoAuthProvider } from "@/components/providers/DemoAuthProvider";
import DemoAuthSwitcher from "@/components/providers/DemoAuthSwitcher";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NearServe",
  description:
    "Local services marketplace — verified providers bid, escrow keeps payments safe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full font antialiased`}
      suppressHydrationWarning
    >
      <head></head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ReduxProvider>
          <DemoAuthProvider>
            <Toaster position="top-right" richColors />
            {children}
            <DemoAuthSwitcher />
          </DemoAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
