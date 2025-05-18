import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/hooks/use-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecallMaster - Spaced Repetition Flashcard Engine",
  description: "A powerful flashcard app for students and lifelong learners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SidebarProvider>
              <div className="flex min-h-screen">
                {/* AppSidebar is rendered conditionally inside each page that needs it */}
                <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
                  {children}
                </main>
              </div>
              <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
