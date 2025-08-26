"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Clock, FileText, ExternalLink } from "lucide-react"

interface ComplianceItem {
  id: string
  title: string
  description: string
  framework: string
  category: string
  status: "completed" | "in-progress" | "not-started" | "overdue"
  dueDate: string
  priority: "high" | "medium" | "low"
  assignee: string
  evidence: string[]
}

export function ComplianceChecklist() {
  const [selectedFramework, setSelectedFramework] = useState("all")
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: "1",
      title: "GHG Emissions Disclosure",
      description: "Report Scope 1, 2, and 3 greenhouse gas emissions",
      framework: "GRI",
      category: "environmental",
      status: "completed",
      dueDate: "2024-12-31",
      priority: "high",
      assignee: "Sarah Chen",
      evidence: ["emissions-report-q3.pdf", "verification-letter.pdf"],
    },
    {
      id: "2",
      title: "Board Diversity Reporting",
      description: "Disclose board composition and diversity metrics",
      framework: "SASB",
      category: "governance",
      status: "in-progress",
      dueDate: "2024-11-15",
      priority: "high",
      assignee: "Mike Johnson",
      evidence: ["board-composition.xlsx"],
    },
    {
      id: "3",
      title: "Employee Safety Metrics",
      description: "Report workplace safety incidents and prevention measures",
      framework: "GRI",
      category: "social",
      status: "overdue",
      dueDate: "2024-10-30",
      priority: "high",
      assignee: "Lisa Wang",
      evidence: [],
    },
    {
      id: "4",
      title: "Water Usage Assessment",
      description: "Assess and report water consumption and conservation efforts",
      framework: "TCFD",
      category: "environmental",
      status: "not-started",
      dueDate: "2024-12-15",
      priority: "medium",
      assignee: "David Park",
      evidence: [],
    },
    {
      id: "5",
      title: "Supplier Code of Conduct",
      description: "Implement and monitor supplier ESG compliance",
      framework: "UN Global Compact",
      category: "governance",
      status: "in-progress",
      dueDate: "2024-11-30",
      priority: "medium",
      assignee: "Sarah Chen",
      evidence: ["supplier-assessment.pdf"],
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      case "not-started":
        return <Badge variant="secondary">Not Started</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
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

  const filteredItems =
    selectedFramework === "all"
      ? complianceItems
      : complianceItems.filter((item) => item.framework === selectedFramework)

  const completionStats = {
    total: complianceItems.length,
    completed: complianceItems.filter((item) => item.status === "completed").length,
    inProgress: complianceItems.filter((item) => item.status === "in-progress").length,
    overdue: complianceItems.filter((item) => item.status === "overdue").length,
  }

  const completionPercentage = (completionStats.completed / completionStats.total) * 100

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Overall Progress</p>
                <p className="text-2xl font-bold">{Math.round(completionPercentage)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completionStats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{completionStats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{completionStats.overdue}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Select value={selectedFramework} onValueChange={setSelectedFramework}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frameworks</SelectItem>
            <SelectItem value="GRI">GRI Standards</SelectItem>
            <SelectItem value="SASB">SASB</SelectItem>
            <SelectItem value="TCFD">TCFD</SelectItem>
            <SelectItem value="UN Global Compact">UN Global Compact</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Export Checklist
        </Button>
      </div>

      {/* Compliance Items */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>Track progress on ESG compliance requirements across all frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox checked={item.status === "completed"} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="outline">{item.framework}</Badge>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Due: {item.dueDate}</span>
                        <span>Assignee: {item.assignee}</span>
                        {item.evidence.length > 0 && <span>{item.evidence.length} evidence file(s)</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(item.priority)}
                    {getStatusBadge(item.status)}
                    {getStatusIcon(item.status)}
                  </div>
                </div>

                {item.evidence.length > 0 && (
                  <div className="ml-7 space-y-2">
                    <p className="text-sm font-medium">Evidence Files:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.evidence.map((file, index) => (
                        <div key={index} className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded">
                          <FileText className="h-3 w-3" />
                          <span>{file}</span>
                          <Button variant="ghost" size="sm" className="h-auto p-0 ml-1">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="ml-7 mt-3 flex space-x-2">
                  <Button size="sm" variant="outline">
                    Update Status
                  </Button>
                  <Button size="sm" variant="outline">
                    Add Evidence
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Framework Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Framework Compliance Progress</CardTitle>
          <CardDescription>Track completion status across different ESG frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["GRI", "SASB", "TCFD", "UN Global Compact"].map((framework) => {
              const frameworkItems = complianceItems.filter((item) => item.framework === framework)
              const completed = frameworkItems.filter((item) => item.status === "completed").length
              const total = frameworkItems.length
              const percentage = total > 0 ? (completed / total) * 100 : 0

              return (
                <div key={framework} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{framework}</span>
                    <span className="text-sm text-muted-foreground">
                      {completed} of {total} completed ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
