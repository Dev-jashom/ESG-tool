"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Calendar, Search, Eye, Share2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Q4 2024 ESG Performance Report",
      type: "Quarterly",
      status: "Published",
      date: "2024-01-15",
      framework: "GRI",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Annual Sustainability Report 2024",
      type: "Annual",
      status: "Draft",
      date: "2024-01-10",
      framework: "SASB",
      size: "5.1 MB",
    },
    {
      id: 3,
      title: "Carbon Footprint Assessment",
      type: "Special",
      status: "Published",
      date: "2024-01-08",
      framework: "TCFD",
      size: "1.8 MB",
    },
    {
      id: 4,
      title: "Diversity & Inclusion Report",
      type: "Quarterly",
      status: "Published",
      date: "2024-01-05",
      framework: "UN Global Compact",
      size: "3.2 MB",
    },
  ]

  const templates = [
    { name: "GRI Standards Report", description: "Comprehensive sustainability reporting", framework: "GRI" },
    { name: "SASB Industry Report", description: "Industry-specific sustainability metrics", framework: "SASB" },
    { name: "TCFD Climate Report", description: "Climate-related financial disclosures", framework: "TCFD" },
    { name: "UN Global Compact COP", description: "Communication on Progress report", framework: "UN Global Compact" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return <Badge variant="default">Published</Badge>
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Generate and manage ESG reports and disclosures</p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search reports..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reports List */}
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{report.title}</h3>
                          {getStatusBadge(report.status)}
                          <Badge variant="outline">{report.framework}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {report.date}
                          </span>
                          <span>{report.type}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {template.name}
                      <Badge variant="outline">{template.framework}</Badge>
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Use Template</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automatically generated reports based on your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Monthly ESG Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Next generation: February 1, 2024</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Quarterly Compliance Report</h4>
                      <p className="text-sm text-muted-foreground">Next generation: March 31, 2024</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Annual Sustainability Report</h4>
                      <p className="text-sm text-muted-foreground">Next generation: December 31, 2024</p>
                    </div>
                    <Badge variant="secondary">Paused</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
