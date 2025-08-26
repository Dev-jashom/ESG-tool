"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Award, CalendarIcon, AlertTriangle, CheckCircle, Plus, FileText, ExternalLink } from "lucide-react"
import { format } from "date-fns"

interface Certification {
  id: string
  name: string
  issuer: string
  category: string
  status: "active" | "expired" | "pending" | "in-progress"
  issueDate: string
  expiryDate: string
  renewalDate: string
  progress: number
  requirements: string[]
  documents: string[]
}

export function CertificationManager() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "ISO 14001 Environmental Management",
      issuer: "International Organization for Standardization",
      category: "environmental",
      status: "active",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      renewalDate: "2026-03-15",
      progress: 100,
      requirements: ["Environmental policy", "Legal compliance", "Continuous improvement"],
      documents: ["iso14001-certificate.pdf", "audit-report-2023.pdf"],
    },
    {
      id: "2",
      name: "B Corp Certification",
      issuer: "B Lab",
      category: "social",
      status: "in-progress",
      issueDate: "",
      expiryDate: "",
      renewalDate: "2024-12-31",
      progress: 75,
      requirements: ["Governance assessment", "Workers impact", "Community impact", "Environmental impact"],
      documents: ["bcorp-application.pdf", "impact-assessment.xlsx"],
    },
    {
      id: "3",
      name: "SOC 2 Type II",
      issuer: "AICPA",
      category: "governance",
      status: "active",
      issueDate: "2024-01-15",
      expiryDate: "2025-01-15",
      renewalDate: "2024-10-15",
      progress: 100,
      requirements: ["Security controls", "Availability controls", "Confidentiality controls"],
      documents: ["soc2-report.pdf", "control-matrix.xlsx"],
    },
    {
      id: "4",
      name: "LEED Gold Certification",
      issuer: "U.S. Green Building Council",
      category: "environmental",
      status: "expired",
      issueDate: "2020-03-10",
      expiryDate: "2024-03-10",
      renewalDate: "2024-01-10",
      progress: 0,
      requirements: ["Energy efficiency", "Water conservation", "Indoor air quality"],
      documents: ["leed-certificate-expired.pdf"],
    },
    {
      id: "5",
      name: "Great Place to Work",
      issuer: "Great Place to Work Institute",
      category: "social",
      status: "pending",
      issueDate: "",
      expiryDate: "",
      renewalDate: "2024-11-30",
      progress: 90,
      requirements: ["Employee survey", "Culture audit", "Leadership assessment"],
      documents: ["gptw-application.pdf", "employee-survey-results.xlsx"],
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "in-progress":
        return <Award className="h-4 w-4 text-blue-600" />
      default:
        return <Award className="h-4 w-4 text-muted-foreground" />
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

  const getDaysUntilExpiry = (expiryDate: string) => {
    if (!expiryDate) return null
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const stats = {
    total: certifications.length,
    active: certifications.filter((cert) => cert.status === "active").length,
    expiringSoon: certifications.filter((cert) => {
      const days = getDaysUntilExpiry(cert.expiryDate)
      return days !== null && days <= 90 && days > 0
    }).length,
    expired: certifications.filter((cert) => cert.status === "expired").length,
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Certifications</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.expiringSoon}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Expired</p>
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Certification Portfolio</CardTitle>
          <CardDescription>Manage your ESG certifications and track renewal dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {certifications.map((cert) => {
              const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate)
              const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 90 && daysUntilExpiry > 0

              return (
                <div key={cert.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(cert.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{cert.name}</h4>
                          <Badge className={getCategoryColor(cert.category)}>
                            {cert.category.charAt(0).toUpperCase() + cert.category.slice(1)}
                          </Badge>
                          {getStatusBadge(cert.status)}
                          {isExpiringSoon && (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              Expires in {daysUntilExpiry} days
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Issued by: {cert.issuer}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          {cert.issueDate && (
                            <div>
                              <span className="font-medium">Issue Date:</span> {cert.issueDate}
                            </div>
                          )}
                          {cert.expiryDate && (
                            <div>
                              <span className="font-medium">Expiry Date:</span> {cert.expiryDate}
                            </div>
                          )}
                          {cert.renewalDate && (
                            <div>
                              <span className="font-medium">Renewal Due:</span> {cert.renewalDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {cert.status === "in-progress" && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-2" />
                    </div>
                  )}

                  <div className="mb-4">
                    <h5 className="text-sm font-medium mb-2">Requirements</h5>
                    <div className="flex flex-wrap gap-2">
                      {cert.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {cert.documents.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium mb-2">Documents</h5>
                      <div className="flex flex-wrap gap-2">
                        {cert.documents.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded">
                            <FileText className="h-3 w-3" />
                            <span>{doc}</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0 ml-1">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {cert.status === "expired" && <Button size="sm">Renew Certification</Button>}
                    {cert.status === "in-progress" && <Button size="sm">Update Progress</Button>}
                    {cert.status === "active" && isExpiringSoon && (
                      <Button size="sm" variant="outline">
                        Start Renewal Process
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Upload Documents
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          <Button className="w-full mt-6">
            <Plus className="mr-2 h-4 w-4" />
            Add New Certification
          </Button>
        </CardContent>
      </Card>

      {/* Add New Certification Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Certification</CardTitle>
          <CardDescription>Track a new ESG certification or standard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-name">Certification Name</Label>
                <Input id="cert-name" placeholder="Enter certification name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization</Label>
                <Input id="issuer" placeholder="Enter issuing organization" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target Date</Label>
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
            </div>

            <div className="flex space-x-2">
              <Button>Add Certification</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Renewal Calendar</CardTitle>
          <CardDescription>Upcoming certification renewals and important dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications
              .filter((cert) => cert.renewalDate)
              .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
              .map((cert) => {
                const renewalDate = new Date(cert.renewalDate)
                const today = new Date()
                const daysUntilRenewal = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                const isUrgent = daysUntilRenewal <= 30

                return (
                  <div
                    key={cert.id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${isUrgent ? "border-red-200 bg-red-50" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className={`h-4 w-4 ${isUrgent ? "text-red-600" : "text-muted-foreground"}`} />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">Renewal due: {cert.renewalDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          isUrgent
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {daysUntilRenewal > 0 ? `${daysUntilRenewal} days` : "Overdue"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
