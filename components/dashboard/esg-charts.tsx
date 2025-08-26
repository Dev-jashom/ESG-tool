"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface ESGChartsProps {
  timeframe: string
}

export function ESGCharts({ timeframe }: ESGChartsProps) {
  console.log("[v0] Rendering ESGCharts component")

  const esgTrendData = [
    { month: "Jan", environmental: 75, social: 70, governance: 72, overall: 72 },
    { month: "Feb", environmental: 77, social: 72, governance: 73, overall: 74 },
    { month: "Mar", environmental: 79, social: 74, governance: 73, overall: 75 },
    { month: "Apr", environmental: 80, social: 75, governance: 74, overall: 76 },
    { month: "May", environmental: 81, social: 76, governance: 74, overall: 77 },
    { month: "Jun", environmental: 82, social: 76, governance: 74, overall: 78 },
  ]

  const emissionsData = [
    { category: "Scope 1", value: 1200, target: 1000 },
    { category: "Scope 2", value: 2800, target: 2500 },
    { category: "Scope 3", value: 4500, target: 4000 },
  ]

  const diversityData = [
    { name: "Male", value: 58, color: "#3b82f6" },
    { name: "Female", value: 42, color: "#10b981" },
  ]

  const complianceData = [
    { framework: "GRI", score: 85 },
    { framework: "SASB", score: 78 },
    { framework: "TCFD", score: 82 },
    { framework: "UN Global Compact", score: 76 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ESG Score Trends */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>ESG Score Trends</CardTitle>
          <CardDescription>Track your ESG performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              environmental: { label: "Environmental", color: "hsl(var(--chart-1))" },
              social: { label: "Social", color: "hsl(var(--chart-2))" },
              governance: { label: "Governance", color: "hsl(var(--chart-3))" },
              overall: { label: "Overall", color: "hsl(var(--primary))" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={esgTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 90]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="environmental"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="social"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="governance"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="overall"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Carbon Emissions */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Emissions</CardTitle>
          <CardDescription>Current vs target emissions (tCO₂e)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: { label: "Current", color: "hsl(var(--chart-1))" },
              target: { label: "Target", color: "hsl(var(--chart-2))" },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gender Diversity */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Diversity</CardTitle>
          <CardDescription>Current workforce composition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diversityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {diversityData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
