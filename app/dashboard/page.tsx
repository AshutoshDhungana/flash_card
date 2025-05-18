"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { DashboardUpcoming } from "@/components/dashboard/dashboard-upcoming";
import { DashboardStreaks } from "@/components/dashboard/dashboard-streaks";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardStats />
        <DashboardStreaks />
        <DashboardCharts />
      </div>
      <DashboardUpcoming />
    </div>
  );
}
