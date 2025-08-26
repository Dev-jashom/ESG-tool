"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react"

export function ComplianceStatus() {
  const frameworks = [
    {
      name: "GRI Standards",
      progress: 85,
      status: "compliant",
      dueDate: "Dec 31, 2024",
      description: "Global Reporting Initiative",
      missingItems: 3,
    },
    {
      name: "SASB",
      progress: 78,
      status: "in-progress",
      dueDate: "Nov 15, 2024",
      description: "Sustainability Accounting Standards Board",
      missingItems: 5,
    },
    {
      name: "TCFD",
      progress: 92,
      status: "compliant",
      dueDate: "Oct 30, 2024",
      description: "Task Force on Climate-related Financial Disclosures",
      missingItems: 1,
    },
    {
      name: "UN Global Compact",
      progress: 65,
      status: "at-risk",
      dueDate: "Jan 31, 2025",
      description: "United Nations Global Compact",
      missingItems: 8,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "at-risk":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "at-risk":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">At Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>Track your progress across ESG frameworks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {frameworks.map((framework) => (
            <div key={framework.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(framework.status)}
                  <div>
                    <h4 className="text-sm font-medium">{framework.name}</h4>
                    <p className="text-xs text-muted-foreground">{framework.description}</p>
                  </div>
                </div>
                {getStatusBadge(framework.status)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{framework.progress}% complete</span>
                  <span className="text-muted-foreground">Due: {framework.dueDate}</span>
                </div>
                <Progress value={framework.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{framework.missingItems} items remaining</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    View details
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <Button className="w-full bg-transparent" variant="outline">
              Generate Compliance Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
