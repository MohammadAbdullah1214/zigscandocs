import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Poppins } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { Footer } from "@/components/footer";
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
        className={`${interFont.variable} ${poppinsFont.variable} subpixel-antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative mx-auto max-w-[1440px] px-2 sm:px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
            <Navbar />
            <SidebarProvider>
              <Suspense>
                <AppSidebar />
              </Suspense>
              <main className="flex-1">
                {children}
              </main>
            </SidebarProvider>
            {/* <Footer /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
