"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ESGOverview } from "@/components/dashboard/esg-overview"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { ESGCharts } from "@/components/dashboard/esg-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ComplianceStatus } from "@/components/dashboard/compliance-status"

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarterly")

  console.log("[v0] Dashboard page rendering with timeframe:", selectedTimeframe)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ESG Score Overview */}
        {(() => {
          console.log("[v0] Rendering ESGOverview component")
          return <ESGOverview timeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} />
        })()}

        {/* Key Metrics Cards */}
        {(() => {
          console.log("[v0] Rendering MetricsCards component")
          return <MetricsCards />
        })()}

        {/* Charts and Analytics */}
        {(() => {
          console.log("[v0] Rendering ESGCharts component")
          return <ESGCharts timeframe={selectedTimeframe} />
        })()}

        {/* Bottom Row - Activity and Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(() => {
            console.log("[v0] Rendering RecentActivity component")
            return <RecentActivity />
          })()}
          {(() => {
            console.log("[v0] Rendering ComplianceStatus component")
            return <ComplianceStatus />
          })()}
        </div>
      </div>
    </DashboardLayout>
  )
}
