"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, ExternalLink, Calendar, AlertTriangle } from "lucide-react"

export function RegulatoryUpdates() {
  const updates = [
    {
      id: 1,
      title: "EU Corporate Sustainability Reporting Directive (CSRD)",
      description: "New mandatory sustainability reporting requirements for large companies",
      date: "2024-01-10",
      priority: "High",
      category: "Environmental",
      status: "Action Required",
      deadline: "2024-06-30",
    },
    {
      id: 2,
      title: "SEC Climate Disclosure Rules Update",
      description: "Updated guidance on climate-related financial risk disclosures",
      date: "2024-01-08",
      priority: "Medium",
      category: "Governance",
      status: "Under Review",
      deadline: "2024-12-31",
    },
    {
      id: 3,
      title: "California SB 253 - Climate Corporate Data Accountability Act",
      description: "Mandatory greenhouse gas emissions reporting for large corporations",
      date: "2024-01-05",
      priority: "High",
      category: "Environmental",
      status: "Compliance Ready",
      deadline: "2024-03-31",
    },
    {
      id: 4,
      title: "UK Modern Slavery Act Amendment",
      description: "Enhanced requirements for supply chain transparency reporting",
      date: "2024-01-03",
      priority: "Medium",
      category: "Social",
      status: "Action Required",
      deadline: "2024-09-30",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High Priority</Badge>
      case "Medium":
        return <Badge variant="default">Medium Priority</Badge>
      default:
        return <Badge variant="secondary">Low Priority</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Action Required":
        return <Badge variant="destructive">Action Required</Badge>
      case "Under Review":
        return <Badge variant="secondary">Under Review</Badge>
      case "Compliance Ready":
        return <Badge variant="default">Compliance Ready</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Regulatory Updates</span>
        </CardTitle>
        <CardDescription>Stay informed about the latest ESG regulations and compliance requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{update.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getPriorityBadge(update.priority)}
                  {update.priority === "High" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated: {update.date}
                  </span>
                  <span>Deadline: {update.deadline}</span>
                  <Badge variant="outline" className="text-xs">
                    {update.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(update.status)}
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full bg-transparent">
            View All Regulatory Updates
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
