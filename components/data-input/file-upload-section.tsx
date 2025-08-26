"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, FileSpreadsheet, File, CheckCircle, AlertCircle, X, Download, Eye } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  category: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  uploadedAt: string
}

export function FileUploadSection() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Q2_Energy_Consumption.xlsx",
      size: "2.4 MB",
      type: "spreadsheet",
      category: "environmental",
      status: "completed",
      progress: 100,
      uploadedAt: "2 hours ago",
    },
    {
      id: "2",
      name: "Employee_Survey_Results.pdf",
      size: "1.8 MB",
      type: "pdf",
      category: "social",
      status: "processing",
      progress: 75,
      uploadedAt: "5 minutes ago",
    },
  ])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file drop logic here
  }, [])

  const getFileIcon = (type: string) => {
    switch (type) {
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />
      default:
        return <File className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      environmental: "bg-green-100 text-green-800 hover:bg-green-100",
      social: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      governance: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    }
    return (
      <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload ESG Reports & Data</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse. Supported formats: PDF, Excel, CSV, Word documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
            <p className="text-sm text-muted-foreground mb-4">Maximum file size: 50MB per file</p>
            <Button>Browse Files</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="category">Data Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Reporting Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" placeholder="Add notes about this upload..." className="resize-none" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Track the status of your uploaded files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center space-x-2">
                      {getCategoryBadge(file.category)}
                      {getStatusIcon(file.status)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{file.size}</span>
                    <span>{file.uploadedAt}</span>
                  </div>
                  {file.status === "processing" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Processing...</span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} className="h-1" />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === "completed" && (
                    <>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Upload Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Upload Templates</CardTitle>
          <CardDescription>Download pre-formatted templates for common ESG data types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Energy Consumption", description: "Monthly energy usage data", icon: "⚡" },
              { name: "Employee Survey", description: "Workforce satisfaction metrics", icon: "👥" },
              { name: "Waste Management", description: "Waste generation and recycling", icon: "♻️" },
              { name: "Water Usage", description: "Water consumption tracking", icon: "💧" },
              { name: "Carbon Emissions", description: "GHG emissions data", icon: "🌍" },
              { name: "Diversity Metrics", description: "D&I reporting template", icon: "🤝" },
            ].map((template) => (
              <div key={template.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{template.icon}</span>
                  <h4 className="font-medium">{template.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
