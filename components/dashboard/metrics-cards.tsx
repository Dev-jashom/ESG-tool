"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Droplets, Recycle, Users, Shield, Award, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

export function MetricsCards() {
  const metrics = [
    {
      title: "Energy Consumption",
      value: "2,847 MWh",
      change: "-12%",
      trend: "down",
      status: "good",
      icon: Zap,
      description: "vs last quarter",
      color: "text-yellow-600",
    },
    {
      title: "Water Usage",
      value: "15,234 L",
      change: "-8%",
      trend: "down",
      status: "good",
      icon: Droplets,
      description: "vs last quarter",
      color: "text-blue-600",
    },
    {
      title: "Waste Recycled",
      value: "89%",
      change: "+5%",
      trend: "up",
      status: "excellent",
      icon: Recycle,
      description: "of total waste",
      color: "text-green-600",
    },
    {
      title: "Employee Satisfaction",
      value: "4.2/5",
      change: "+0.3",
      trend: "up",
      status: "good",
      icon: Users,
      description: "latest survey",
      color: "text-purple-600",
    },
    {
      title: "Data Security Score",
      value: "94%",
      change: "+2%",
      trend: "up",
      status: "excellent",
      icon: Shield,
      description: "compliance rate",
      color: "text-red-600",
    },
    {
      title: "Certifications",
      value: "12",
      change: "+3",
      trend: "up",
      status: "good",
      icon: Award,
      description: "active certifications",
      color: "text-orange-600",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
      case "good":
        return <Badge variant="secondary">Good</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      default:
        return <Badge variant="outline">Needs Attention</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  {getStatusBadge(metric.status)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {getTrendIcon(metric.trend)}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-green-600"}>{metric.change}</span>
                  <span>{metric.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
