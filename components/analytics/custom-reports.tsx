"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileText, Download, Share, Eye, Plus, Settings, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface SavedReport {
  id: string
  name: string
  description: string
  type: string
  frequency: string
  lastGenerated: string
  status: "active" | "draft" | "archived"
}

export function CustomReports() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [savedReports, setSavedReports] = useState<SavedReport[]>([
    {
      id: "1",
      name: "Monthly ESG Summary",
      description: "Comprehensive monthly overview of all ESG metrics",
      type: "summary",
      frequency: "monthly",
      lastGenerated: "Oct 1, 2024",
      status: "active",
    },
    {
      id: "2",
      name: "Carbon Footprint Analysis",
      description: "Detailed analysis of carbon emissions across all scopes",
      type: "environmental",
      frequency: "quarterly",
      lastGenerated: "Sep 30, 2024",
      status: "active",
    },
    {
      id: "3",
      name: "Board Governance Report",
      description: "Governance metrics and board performance analysis",
      type: "governance",
      frequency: "annually",
      lastGenerated: "Dec 31, 2023",
      status: "draft",
    },
  ])

  const reportTemplates = [
    {
      name: "Executive Summary",
      description: "High-level ESG performance overview for leadership",
      category: "summary",
      estimatedPages: "5-8 pages",
    },
    {
      name: "Sustainability Report",
      description: "Comprehensive sustainability performance report",
      category: "environmental",
      estimatedPages: "15-20 pages",
    },
    {
      name: "Social Impact Assessment",
      description: "Employee and community impact analysis",
      category: "social",
      estimatedPages: "10-15 pages",
    },
    {
      name: "Governance & Ethics Report",
      description: "Corporate governance and ethics compliance report",
      category: "governance",
      estimatedPages: "8-12 pages",
    },
    {
      name: "Stakeholder Report",
      description: "ESG performance report for external stakeholders",
      category: "stakeholder",
      estimatedPages: "12-18 pages",
    },
    {
      name: "Regulatory Compliance",
      description: "Compliance status across all ESG frameworks",
      category: "compliance",
      estimatedPages: "6-10 pages",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
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
      case "summary":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      case "stakeholder":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "compliance":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
          <CardDescription>Manage your custom ESG reports and automated schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{report.name}</h4>
                    {getStatusBadge(report.status)}
                    <Badge variant="outline">{report.frequency}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                  <p className="text-xs text-muted-foreground">Last generated: {report.lastGenerated}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create New Report
          </Button>
        </CardContent>
      </Card>

      {/* Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>Create tailored ESG reports with specific metrics and formatting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input id="report-name" placeholder="Enter report name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Executive Summary</SelectItem>
                    <SelectItem value="detailed">Detailed Analysis</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                    <SelectItem value="stakeholder">Stakeholder Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-description">Description</Label>
              <Textarea id="report-description" placeholder="Describe the purpose and scope of this report" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Reporting Period</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="powerpoint">PowerPoint</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Include Sections</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Core Metrics</h4>
                  {[
                    "Executive Summary",
                    "ESG Score Overview",
                    "Key Performance Indicators",
                    "Trend Analysis",
                    "Benchmark Comparison",
                  ].map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Checkbox id={section} defaultChecked />
                      <Label htmlFor={section} className="text-sm">
                        {section}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Detailed Sections</h4>
                  {[
                    "Environmental Impact",
                    "Social Responsibility",
                    "Governance Metrics",
                    "Risk Assessment",
                    "Future Projections",
                  ].map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Checkbox id={section} />
                      <Label htmlFor={section} className="text-sm">
                        {section}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline">Save as Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Start with pre-built templates for common ESG reporting needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <div key={template.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <p className="text-xs text-muted-foreground mb-4">{template.estimatedPages}</p>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export & Sharing Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Choose how to export and share your reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  format: "PDF Report",
                  description: "Professional formatted document for stakeholders",
                  icon: "📄",
                },
                {
                  format: "Excel Workbook",
                  description: "Detailed data tables with charts and analysis",
                  icon: "📊",
                },
                {
                  format: "PowerPoint Presentation",
                  description: "Executive presentation with key highlights",
                  icon: "📈",
                },
                {
                  format: "Interactive Dashboard",
                  description: "Web-based dashboard with live data",
                  icon: "🖥️",
                },
              ].map((option) => (
                <div key={option.format} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-2xl">{option.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{option.format}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sharing & Distribution</CardTitle>
            <CardDescription>Manage report access and distribution settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Email Recipients</Label>
                <Input id="recipients" placeholder="Enter email addresses separated by commas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="access-level">Access Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">View Only</SelectItem>
                    <SelectItem value="comment">View & Comment</SelectItem>
                    <SelectItem value="edit">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Password Protection</Label>
                  <p className="text-sm text-muted-foreground">Require password to access report</p>
                </div>
                <Checkbox />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiration Date</Label>
                  <p className="text-sm text-muted-foreground">Set automatic expiration for shared links</p>
                </div>
                <Checkbox />
              </div>
              <Button className="w-full">
                <Share className="mr-2 h-4 w-4" />
                Share Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
