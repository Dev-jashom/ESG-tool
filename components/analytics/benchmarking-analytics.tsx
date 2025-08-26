"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Award, Target, Building2 } from "lucide-react"

export function BenchmarkingAnalytics() {
  const industryBenchmarkData = [
    { category: "Environmental", yourScore: 82, industryAvg: 68, topPerformer: 91 },
    { category: "Social", yourScore: 76, industryAvg: 72, topPerformer: 88 },
    { category: "Governance", yourScore: 74, industryAvg: 75, topPerformer: 89 },
    { category: "Overall ESG", yourScore: 78, industryAvg: 71, topPerformer: 89 },
  ]

  const radarData = [
    { subject: "Carbon Management", yourCompany: 85, industryAvg: 70, fullMark: 100 },
    { subject: "Energy Efficiency", yourCompany: 88, industryAvg: 65, fullMark: 100 },
    { subject: "Water Management", yourCompany: 75, industryAvg: 68, fullMark: 100 },
    { subject: "Waste Management", yourCompany: 92, industryAvg: 72, fullMark: 100 },
    { subject: "Employee Satisfaction", yourCompany: 78, industryAvg: 74, fullMark: 100 },
    { subject: "Diversity & Inclusion", yourCompany: 82, industryAvg: 69, fullMark: 100 },
    { subject: "Board Independence", yourCompany: 75, industryAvg: 78, fullMark: 100 },
    { subject: "Ethics & Compliance", yourCompany: 94, industryAvg: 81, fullMark: 100 },
  ]

  const peerComparison = [
    { company: "Your Company", score: 78, rank: 3, employees: "1,200" },
    { company: "TechCorp A", score: 89, rank: 1, employees: "2,500" },
    { company: "InnovateTech", score: 85, rank: 2, employees: "1,800" },
    { company: "DataSystems Inc", score: 72, rank: 4, employees: "950" },
    { company: "CloudTech Solutions", score: 68, rank: 5, employees: "1,100" },
    { company: "AI Dynamics", score: 65, rank: 6, employees: "800" },
  ]

  const getPerformanceColor = (yourScore: number, benchmark: number) => {
    if (yourScore > benchmark + 5) return "text-green-600"
    if (yourScore > benchmark - 5) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceBadge = (yourScore: number, benchmark: number) => {
    if (yourScore > benchmark + 5)
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Above Average</Badge>
    if (yourScore > benchmark - 5) return <Badge variant="secondary">Average</Badge>
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Below Average</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="technology">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology Sector</SelectItem>
              <SelectItem value="software">Software & IT Services</SelectItem>
              <SelectItem value="fintech">Financial Technology</SelectItem>
              <SelectItem value="all">All Industries</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="similar-size">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="similar-size">Similar Company Size</SelectItem>
              <SelectItem value="all-sizes">All Company Sizes</SelectItem>
              <SelectItem value="large">Large Companies (1000+)</SelectItem>
              <SelectItem value="medium">Medium Companies (200-1000)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Target className="mr-2 h-4 w-4" />
          Set Benchmarks
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {industryBenchmarkData.map((item) => (
          <Card key={item.category}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{item.category}</h4>
                  {getPerformanceBadge(item.yourScore, item.industryAvg)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Your Score</span>
                    <span className={`font-bold ${getPerformanceColor(item.yourScore, item.industryAvg)}`}>
                      {item.yourScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Industry Avg</span>
                    <span>{item.industryAvg}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Top Performer</span>
                    <span>{item.topPerformer}</span>
                  </div>
                </div>
                <Progress value={(item.yourScore / item.topPerformer) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Benchmark Comparison</CardTitle>
          <CardDescription>Compare your ESG performance against industry averages and top performers</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              yourScore: { label: "Your Company", color: "hsl(var(--primary))" },
              industryAvg: { label: "Industry Average", color: "hsl(var(--chart-2))" },
              topPerformer: { label: "Top Performer", color: "hsl(var(--chart-1))" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryBenchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="yourScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="industryAvg" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="topPerformer" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Radar</CardTitle>
            <CardDescription>Multi-dimensional comparison across key ESG metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                yourCompany: { label: "Your Company", color: "hsl(var(--primary))" },
                industryAvg: { label: "Industry Average", color: "hsl(var(--chart-2))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Your Company"
                    dataKey="yourCompany"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Industry Average"
                    dataKey="industryAvg"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Peer Ranking */}
        <Card>
          <CardHeader>
            <CardTitle>Peer Company Rankings</CardTitle>
            <CardDescription>Your position among similar technology companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peerComparison.map((company, index) => (
                <div
                  key={company.company}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    company.company === "Your Company" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {company.rank}
                    </div>
                    <div>
                      <p className="font-medium">{company.company}</p>
                      <p className="text-sm text-muted-foreground">{company.employees} employees</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{company.score}</p>
                    <p className="text-sm text-muted-foreground">ESG Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Improvement Opportunities</CardTitle>
          <CardDescription>Areas where you can close the gap with top performers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-red-600" />
                <h4 className="font-medium text-red-700">Priority Areas</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Board Independence</span>
                    <span className="text-sm text-red-600">-3 pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Below industry average</p>
                </div>
                <div className="p-3 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Water Management</span>
                    <span className="text-sm text-red-600">-7 pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Gap with top performers</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-700">Growth Areas</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Employee Satisfaction</span>
                    <span className="text-sm text-yellow-600">+4 pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Opportunity for improvement</p>
                </div>
                <div className="p-3 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Diversity & Inclusion</span>
                    <span className="text-sm text-yellow-600">+6 pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Room for enhancement</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-700">Strengths</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Ethics & Compliance</span>
                    <span className="text-sm text-green-600">+13 pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Well above average</p>
                </div>
                <div className="p-3 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Waste Management</span>
                    <span className="text-sm text-green-600">+20 pts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Industry leader</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
