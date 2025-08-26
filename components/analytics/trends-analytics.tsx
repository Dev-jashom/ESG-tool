"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Download, Filter } from "lucide-react"

export function TrendsAnalytics() {
  const [timeframe, setTimeframe] = useState("12months")
  const [selectedMetric, setSelectedMetric] = useState("overall")

  const trendData = [
    { month: "Jan", environmental: 75, social: 70, governance: 72, overall: 72 },
    { month: "Feb", environmental: 77, social: 72, governance: 73, overall: 74 },
    { month: "Mar", environmental: 79, social: 74, governance: 73, overall: 75 },
    { month: "Apr", environmental: 80, social: 75, governance: 74, overall: 76 },
    { month: "May", environmental: 81, social: 76, governance: 74, overall: 77 },
    { month: "Jun", environmental: 82, social: 76, governance: 74, overall: 78 },
    { month: "Jul", environmental: 83, social: 77, governance: 75, overall: 78 },
    { month: "Aug", environmental: 84, social: 78, governance: 76, overall: 79 },
    { month: "Sep", environmental: 85, social: 79, governance: 77, overall: 80 },
    { month: "Oct", environmental: 86, social: 80, governance: 78, overall: 81 },
    { month: "Nov", environmental: 87, social: 81, governance: 79, overall: 82 },
    { month: "Dec", environmental: 88, social: 82, governance: 80, overall: 83 },
  ]

  const carbonEmissionsData = [
    { month: "Jan", scope1: 1200, scope2: 2800, scope3: 4500 },
    { month: "Feb", scope1: 1150, scope2: 2750, scope3: 4400 },
    { month: "Mar", scope1: 1100, scope2: 2700, scope3: 4300 },
    { month: "Apr", scope1: 1050, scope2: 2650, scope3: 4200 },
    { month: "May", scope1: 1000, scope2: 2600, scope3: 4100 },
    { month: "Jun", scope1: 950, scope2: 2550, scope3: 4000 },
  ]

  const diversityTrendData = [
    { quarter: "Q1", female: 38, male: 62, nonBinary: 0 },
    { quarter: "Q2", female: 40, male: 59, nonBinary: 1 },
    { quarter: "Q3", female: 42, male: 57, nonBinary: 1 },
    { quarter: "Q4", female: 44, male: 55, nonBinary: 1 },
  ]

  const keyInsights = [
    {
      title: "Carbon Emissions Reduction",
      value: "-15%",
      trend: "down",
      description: "Year-over-year reduction in total carbon footprint",
      category: "environmental",
    },
    {
      title: "Employee Satisfaction",
      value: "+12%",
      trend: "up",
      description: "Improvement in overall employee satisfaction scores",
      category: "social",
    },
    {
      title: "Board Diversity",
      value: "+25%",
      trend: "up",
      description: "Increase in diverse board representation",
      category: "governance",
    },
    {
      title: "Energy Efficiency",
      value: "+18%",
      trend: "up",
      description: "Improvement in energy efficiency metrics",
      category: "environmental",
    },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-green-600" />
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "environmental":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "social":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "governance":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="2years">Last 2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">Overall ESG Score</SelectItem>
              <SelectItem value="environmental">Environmental</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="governance">Governance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyInsights.map((insight) => (
          <Card key={insight.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(insight.category)}>
                  {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                </Badge>
                {getTrendIcon(insight.trend)}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{insight.value}</p>
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>ESG Performance Trends</CardTitle>
          <CardDescription>Track your ESG scores over time across all categories</CardDescription>
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
              <LineChart data={trendData}>
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

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Emissions Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Carbon Emissions Reduction</CardTitle>
            <CardDescription>Track progress across all emission scopes (tCO₂e)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                scope1: { label: "Scope 1", color: "hsl(var(--chart-1))" },
                scope2: { label: "Scope 2", color: "hsl(var(--chart-2))" },
                scope3: { label: "Scope 3", color: "hsl(var(--chart-3))" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={carbonEmissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="scope3"
                    stackId="1"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="scope2"
                    stackId="1"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="scope1"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Diversity Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Workforce Diversity Trends</CardTitle>
            <CardDescription>Gender representation progress over quarters</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                female: { label: "Female", color: "hsl(var(--chart-2))" },
                male: { label: "Male", color: "hsl(var(--chart-1))" },
                nonBinary: { label: "Non-Binary", color: "hsl(var(--chart-3))" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diversityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="female" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="male" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nonBinary" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key metrics and achievements over the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-green-700">Environmental Achievements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Energy Efficiency</span>
                  <span className="font-medium">+18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Renewable Energy</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Waste Reduction</span>
                  <span className="font-medium">-22%</span>
                </div>
                <div className="flex justify-between">
                  <span>Water Conservation</span>
                  <span className="font-medium">-8%</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-blue-700">Social Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Employee Satisfaction</span>
                  <span className="font-medium">4.2/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Training Hours</span>
                  <span className="font-medium">+35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Diversity Ratio</span>
                  <span className="font-medium">44%</span>
                </div>
                <div className="flex justify-between">
                  <span>Safety Incidents</span>
                  <span className="font-medium">-60%</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-purple-700">Governance Excellence</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Board Independence</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span>Policy Updates</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Score</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ethics Training</span>
                  <span className="font-medium">98%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
