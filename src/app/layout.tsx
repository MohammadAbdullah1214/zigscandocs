import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Poppins } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZigScan Docs",
  description: "Under development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${poppinsFont.variable} antialiased bg-background text-foreground`}
      >
        <div className="relative mx-auto max-w-[1440px] px-2 sm:px-4 md:px-6 lg:px-8">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <SidebarProvider>
              <Suspense
                fallback={
                  <div className="p-4 text-muted-foreground">
                    Loading sidebar...
                  </div>
                }
              >
                <AppSidebar />
                {children}
              </Suspense>
            </SidebarProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
