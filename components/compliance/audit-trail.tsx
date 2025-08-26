"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Download, Search, Eye } from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: string
  user: string
  userAvatar: string
  action: string
  resource: string
  category: string
  details: string
  ipAddress: string
  status: "success" | "warning" | "error"
}

export function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30days")

  const auditEntries: AuditEntry[] = [
    {
      id: "1",
      timestamp: "2024-10-15 14:32:15",
      user: "Sarah Chen",
      userAvatar: "/professional-woman-diverse.png",
      action: "Updated ESG Data",
      resource: "Carbon Emissions Q3 2024",
      category: "environmental",
      details: "Modified Scope 2 emissions data from 2,800 to 2,750 tCO₂e",
      ipAddress: "192.168.1.100",
      status: "success",
    },
    {
      id: "2",
      timestamp: "2024-10-15 11:45:22",
      user: "Mike Johnson",
      userAvatar: "/professional-man.png",
      action: "Generated Report",
      resource: "Monthly ESG Summary",
      category: "reporting",
      details: "Generated and exported monthly ESG summary report (PDF)",
      ipAddress: "192.168.1.101",
      status: "success",
    },
    {
      id: "3",
      timestamp: "2024-10-15 09:18:33",
      user: "System",
      userAvatar: "",
      action: "Data Sync Failed",
      resource: "HR Information System",
      category: "integration",
      details: "Failed to sync employee diversity data - connection timeout",
      ipAddress: "10.0.0.1",
      status: "error",
    },
    {
      id: "4",
      timestamp: "2024-10-14 16:22:11",
      user: "Lisa Wang",
      userAvatar: "/professional-asian-woman.png",
      action: "Compliance Check",
      resource: "GRI Standards Checklist",
      category: "compliance",
      details: "Marked 'Water Usage Assessment' as completed with evidence upload",
      ipAddress: "192.168.1.102",
      status: "success",
    },
    {
      id: "5",
      timestamp: "2024-10-14 13:55:44",
      user: "David Park",
      userAvatar: "/professional-asian-man.png",
      action: "User Access Modified",
      resource: "Admin Settings",
      category: "security",
      details: "Added new user 'John Smith' with Analyst role permissions",
      ipAddress: "192.168.1.103",
      status: "warning",
    },
    {
      id: "6",
      timestamp: "2024-10-14 10:30:17",
      user: "Sarah Chen",
      userAvatar: "/professional-woman-diverse.png",
      action: "Survey Launched",
      resource: "Employee Satisfaction Q4 2024",
      category: "social",
      details: "Launched quarterly employee satisfaction survey to 200 recipients",
      ipAddress: "192.168.1.100",
      status: "success",
    },
    {
      id: "7",
      timestamp: "2024-10-13 15:12:08",
      user: "Mike Johnson",
      userAvatar: "/professional-man.png",
      action: "Policy Updated",
      resource: "Data Privacy Policy",
      category: "governance",
      details: "Updated data privacy policy version 2.1 with GDPR compliance changes",
      ipAddress: "192.168.1.101",
      status: "success",
    },
    {
      id: "8",
      timestamp: "2024-10-13 12:45:33",
      user: "System",
      userAvatar: "",
      action: "Automated Backup",
      resource: "ESG Database",
      category: "system",
      details: "Completed scheduled backup of ESG database (2.3GB)",
      ipAddress: "10.0.0.1",
      status: "success",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
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
      case "reporting":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "compliance":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "integration":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100"
      case "security":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100"
      case "system":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const filteredEntries = auditEntries.filter((entry) => {
    const matchesSearch =
      searchTerm === "" ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Activities</p>
                <p className="text-2xl font-bold">{auditEntries.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Successful Actions</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditEntries.filter((e) => e.status === "success").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {auditEntries.filter((e) => e.status === "warning").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-yellow-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Errors</p>
                <p className="text-2xl font-bold text-red-600">
                  {auditEntries.filter((e) => e.status === "error").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-red-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="governance">Governance</SelectItem>
            <SelectItem value="reporting">Reporting</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="integration">Integration</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24hours">Last 24 Hours</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            Complete log of all system activities and user actions ({filteredEntries.length} entries)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {entry.user === "System" ? (
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-bold">SYS</span>
                    </div>
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.userAvatar || "/placeholder.svg"} alt={entry.user} />
                      <AvatarFallback>
                        {entry.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{entry.action}</p>
                      <Badge className={getCategoryColor(entry.category)}>
                        {entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
                      </Badge>
                      {getStatusBadge(entry.status)}
                    </div>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">{entry.user}</span> • {entry.resource}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">{entry.details}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">IP: {entry.ipAddress}</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Breakdown of audit activities by category and user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">By Category</h4>
              <div className="space-y-2">
                {[
                  "environmental",
                  "social",
                  "governance",
                  "reporting",
                  "compliance",
                  "integration",
                  "security",
                  "system",
                ].map((category) => {
                  const count = auditEntries.filter((entry) => entry.category === category).length
                  const percentage = (count / auditEntries.length) * 100
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(category)}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        {count} ({Math.round(percentage)}%)
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Top Users</h4>
              <div className="space-y-2">
                {Array.from(new Set(auditEntries.map((entry) => entry.user)))
                  .map((user) => ({
                    user,
                    count: auditEntries.filter((entry) => entry.user === user).length,
                  }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map(({ user, count }) => (
                    <div key={user} className="flex items-center justify-between">
                      <span className="text-sm">{user}</span>
                      <span className="text-sm font-medium">{count} actions</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
