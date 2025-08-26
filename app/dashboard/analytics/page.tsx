"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendsAnalytics } from "@/components/analytics/trends-analytics"
import { BenchmarkingAnalytics } from "@/components/analytics/benchmarking-analytics"
import { ForecastingAnalytics } from "@/components/analytics/forecasting-analytics"
import { CustomReports } from "@/components/analytics/custom-reports"
import { TrendingUp, BarChart3, Target, FileText } from "lucide-react"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("trends")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">ESG Analytics & Trends</h1>
          <p className="text-muted-foreground">
            Analyze performance trends, benchmark against industry standards, and forecast future outcomes
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="benchmarking" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Benchmarking</span>
            </TabsTrigger>
            <TabsTrigger value="forecasting" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Forecasting</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Custom Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <TrendsAnalytics />
          </TabsContent>

          <TabsContent value="benchmarking" className="space-y-6">
            <BenchmarkingAnalytics />
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <ForecastingAnalytics />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <CustomReports />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
