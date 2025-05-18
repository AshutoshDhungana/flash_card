"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine if we're on an auth page or homepage
  const isAuthPage = pathname?.startsWith("/auth") || false;
  const isHomePage = pathname === "/";

  // Only show sidebar for authenticated routes that aren't homepage or auth pages
  const showSidebar = !isAuthPage && !isHomePage;

  return (
    <div className="flex min-h-screen">
      {showSidebar && <AppSidebar />}
      <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
