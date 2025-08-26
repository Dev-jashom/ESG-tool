"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Target, AlertTriangle, CheckCircle } from "lucide-react"

export function ForecastingAnalytics() {
  const forecastData = [
    { period: "2024 Q1", actual: 78, predicted: null, confidence: null },
    { period: "2024 Q2", actual: 79, predicted: null, confidence: null },
    { period: "2024 Q3", actual: 80, predicted: null, confidence: null },
    { period: "2024 Q4", actual: 81, predicted: 81, confidence: 95 },
    { period: "2025 Q1", actual: null, predicted: 82, confidence: 92 },
    { period: "2025 Q2", actual: null, predicted: 84, confidence: 88 },
    { period: "2025 Q3", actual: null, predicted: 85, confidence: 85 },
    { period: "2025 Q4", actual: null, predicted: 87, confidence: 82 },
  ]

  const carbonForecastData = [
    { year: "2024", actual: 8500, target: 8000, predicted: null },
    { year: "2025", actual: null, target: 7200, predicted: 7800 },
    { year: "2026", actual: null, target: 6400, predicted: 7100 },
    { year: "2027", actual: null, target: 5600, predicted: 6200 },
    { year: "2028", actual: null, target: 4800, predicted: 5100 },
    { year: "2030", actual: null, target: 3200, predicted: 3800 },
  ]

  const scenarioAnalysis = [
    {
      scenario: "Conservative",
      description: "Maintaining current improvement rate",
      esgScore2025: 84,
      carbonReduction: "15%",
      probability: "High",
      color: "blue",
    },
    {
      scenario: "Optimistic",
      description: "Accelerated ESG initiatives",
      esgScore2025: 89,
      carbonReduction: "25%",
      probability: "Medium",
      color: "green",
    },
    {
      scenario: "Aggressive",
      description: "Maximum investment in sustainability",
      esgScore2025: 93,
      carbonReduction: "35%",
      probability: "Low",
      color: "purple",
    },
  ]

  const riskFactors = [
    {
      factor: "Regulatory Changes",
      impact: "High",
      probability: "Medium",
      description: "New ESG reporting requirements may affect compliance scores",
      mitigation: "Proactive policy monitoring and early adoption",
    },
    {
      factor: "Supply Chain Disruption",
      impact: "Medium",
      probability: "High",
      description: "Supplier sustainability issues could impact environmental scores",
      mitigation: "Diversify suppliers and strengthen due diligence",
    },
    {
      factor: "Talent Retention",
      impact: "Medium",
      probability: "Low",
      description: "High turnover could negatively affect social metrics",
      mitigation: "Enhanced employee engagement and benefits programs",
    },
  ]

  const getScenarioColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "blue":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "purple":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="2years">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
              <SelectItem value="5years">5 Years</SelectItem>
              <SelectItem value="10years">10 Years</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="quarterly">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Target className="mr-2 h-4 w-4" />
          Update Model
        </Button>
      </div>

      {/* ESG Score Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>ESG Score Forecast</CardTitle>
          <CardDescription>Predicted ESG performance based on current trends and planned initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              actual: { label: "Actual", color: "hsl(var(--primary))" },
              predicted: { label: "Predicted", color: "hsl(var(--chart-2))" },
              confidence: { label: "Confidence", color: "hsl(var(--chart-3))" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[70, 90]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">87</div>
              <div className="text-sm text-muted-foreground">Predicted 2025 Score</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+9</div>
              <div className="text-sm text-muted-foreground">Expected Improvement</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-muted-foreground">Confidence Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carbon Emissions Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Emissions Trajectory</CardTitle>
          <CardDescription>Projected emissions reduction path toward net-zero goals (tCO₂e)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              actual: { label: "Actual Emissions", color: "hsl(var(--chart-1))" },
              predicted: { label: "Predicted Emissions", color: "hsl(var(--chart-2))" },
              target: { label: "Target Emissions", color: "hsl(var(--chart-3))" },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.5}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Analysis</CardTitle>
          <CardDescription>Compare different strategic approaches and their projected outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarioAnalysis.map((scenario) => (
              <div key={scenario.scenario} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{scenario.scenario}</h4>
                  <Badge className={getScenarioColor(scenario.color)}>{scenario.probability} Probability</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">2025 ESG Score</span>
                    <span className="font-medium">{scenario.esgScore2025}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Carbon Reduction</span>
                    <span className="font-medium">{scenario.carbonReduction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Potential factors that could impact your ESG forecast</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((risk) => (
              <div key={risk.factor} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`h-4 w-4 ${getImpactColor(risk.impact)}`} />
                    <h4 className="font-medium">{risk.factor}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Impact: {risk.impact}</Badge>
                    <Badge variant="outline">Probability: {risk.probability}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-sm">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Achievement Probability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Target Achievement Probability</CardTitle>
            <CardDescription>Likelihood of meeting your 2025 ESG goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Overall ESG Score (Target: 85)</span>
                  <span className="font-medium text-green-600">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Carbon Reduction (Target: 25%)</span>
                  <span className="font-medium text-yellow-600">65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Diversity Goals (Target: 50%)</span>
                  <span className="font-medium text-green-600">82%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Renewable Energy (Target: 80%)</span>
                  <span className="font-medium text-red-600">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>Strategic initiatives to improve forecast outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm">Accelerate Renewable Energy</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Increase renewable energy adoption to improve environmental scores
                </p>
              </div>
              <div className="p-3 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">Enhance Board Diversity</span>
                </div>
                <p className="text-xs text-muted-foreground">Add diverse board members to strengthen governance</p>
              </div>
              <div className="p-3 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-sm">Supplier Engagement</span>
                </div>
                <p className="text-xs text-muted-foreground">Work with suppliers to reduce Scope 3 emissions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
