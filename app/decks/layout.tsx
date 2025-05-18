"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DecksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div
        className="container mx-auto p-4 md:p-6 flex items-center justify-center"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
