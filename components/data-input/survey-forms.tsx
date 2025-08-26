"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ClipboardList, Users, Send, Eye, BarChart3, Plus, Settings, Copy } from "lucide-react"

interface Survey {
  id: string
  title: string
  description: string
  category: string
  status: "draft" | "active" | "completed"
  responses: number
  targetResponses: number
  createdAt: string
  dueDate: string
}

export function SurveyForms() {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: "1",
      title: "Employee Satisfaction Survey Q3 2024",
      description: "Quarterly assessment of employee engagement and workplace satisfaction",
      category: "social",
      status: "active",
      responses: 127,
      targetResponses: 200,
      createdAt: "Oct 1, 2024",
      dueDate: "Oct 31, 2024",
    },
    {
      id: "2",
      title: "Environmental Awareness Survey",
      description: "Assess employee awareness and participation in sustainability initiatives",
      category: "environmental",
      status: "completed",
      responses: 185,
      targetResponses: 150,
      createdAt: "Sep 1, 2024",
      dueDate: "Sep 30, 2024",
    },
    {
      id: "3",
      title: "Ethics and Compliance Training Feedback",
      description: "Feedback on recent ethics training and compliance awareness",
      category: "governance",
      status: "draft",
      responses: 0,
      targetResponses: 100,
      createdAt: "Oct 15, 2024",
      dueDate: "Nov 15, 2024",
    },
  ])

  const surveyTemplates = [
    {
      name: "Employee Engagement",
      description: "Comprehensive employee satisfaction and engagement assessment",
      category: "social",
      questions: 25,
      estimatedTime: "10-15 minutes",
    },
    {
      name: "Sustainability Awareness",
      description: "Measure employee awareness of environmental initiatives",
      category: "environmental",
      questions: 15,
      estimatedTime: "5-8 minutes",
    },
    {
      name: "Diversity & Inclusion",
      description: "Assess workplace diversity and inclusion effectiveness",
      category: "social",
      questions: 20,
      estimatedTime: "8-12 minutes",
    },
    {
      name: "Ethics & Compliance",
      description: "Evaluate understanding of company ethics and compliance policies",
      category: "governance",
      questions: 18,
      estimatedTime: "7-10 minutes",
    },
    {
      name: "Remote Work Experience",
      description: "Gather feedback on remote work policies and support",
      category: "social",
      questions: 22,
      estimatedTime: "10-15 minutes",
    },
    {
      name: "Supply Chain Sustainability",
      description: "Assess supplier sustainability practices and awareness",
      category: "environmental",
      questions: 12,
      estimatedTime: "5-7 minutes",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
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

  return (
    <div className="space-y-6">
      {/* Active Surveys */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Management</CardTitle>
          <CardDescription>Create and manage ESG surveys to collect stakeholder feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{survey.title}</h4>
                      <Badge className={getCategoryColor(survey.category)}>
                        {survey.category.charAt(0).toUpperCase() + survey.category.slice(1)}
                      </Badge>
                      {getStatusBadge(survey.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{survey.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Created: {survey.createdAt}</span>
                      <span>Due: {survey.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {survey.status === "active" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Response Progress</span>
                      <span>
                        {survey.responses} / {survey.targetResponses} responses
                      </span>
                    </div>
                    <Progress value={(survey.responses / survey.targetResponses) * 100} className="h-2" />
                  </div>
                )}

                {survey.status === "completed" && (
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-green-600">
                      <Users className="h-4 w-4" />
                      <span>{survey.responses} responses collected</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Results
                    </Button>
                  </div>
                )}

                {survey.status === "draft" && (
                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <Send className="mr-2 h-4 w-4" />
                      Launch Survey
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button className="w-full mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create New Survey
          </Button>
        </CardContent>
      </Card>

      {/* Survey Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Templates</CardTitle>
          <CardDescription>Start with pre-built templates for common ESG survey types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surveyTemplates.map((template) => (
              <div key={template.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{template.questions} questions</span>
                  <span>{template.estimatedTime}</span>
                </div>
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

      {/* Survey Builder Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Survey Builder</CardTitle>
          <CardDescription>Create a simple survey with common ESG questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="survey-title">Survey Title</Label>
                <Input id="survey-title" placeholder="Enter survey title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="survey-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="general">General ESG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="survey-description">Description</Label>
              <Textarea id="survey-description" placeholder="Describe the purpose and scope of this survey" rows={3} />
            </div>

            <div className="space-y-4">
              <Label>Sample Questions (Select to include)</Label>
              <div className="space-y-3">
                {[
                  "How satisfied are you with the company's environmental initiatives?",
                  "Do you feel the workplace promotes diversity and inclusion?",
                  "Are you aware of the company's code of ethics?",
                  "How would you rate work-life balance at the company?",
                  "Do you have access to professional development opportunities?",
                ].map((question, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`question-${index}`} />
                    <Label htmlFor={`question-${index}`} className="text-sm">
                      {question}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-responses">Target Responses</Label>
                <Input id="target-responses" type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distribution">Distribution Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="internal">Internal Portal</SelectItem>
                    <SelectItem value="public">Public Link</SelectItem>
                    <SelectItem value="qr">QR Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button>
                <ClipboardList className="mr-2 h-4 w-4" />
                Create Survey
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Save as Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribution Options</CardTitle>
            <CardDescription>Choose how to share your surveys</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  method: "Email Campaign",
                  description: "Send directly to employee email addresses",
                  icon: "📧",
                },
                {
                  method: "Internal Portal",
                  description: "Embed in company intranet or dashboard",
                  icon: "🏢",
                },
                {
                  method: "Public Link",
                  description: "Share via URL for external stakeholders",
                  icon: "🔗",
                },
                {
                  method: "QR Code",
                  description: "Generate QR code for physical locations",
                  icon: "📱",
                },
              ].map((option) => (
                <div key={option.method} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-2xl">{option.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{option.method}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Analytics</CardTitle>
            <CardDescription>Track survey performance and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">312</div>
                  <div className="text-sm text-muted-foreground">Total Responses</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">78%</div>
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">6.2</div>
                  <div className="text-sm text-muted-foreground">Avg. Completion Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">4.3</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Score</div>
                </div>
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
