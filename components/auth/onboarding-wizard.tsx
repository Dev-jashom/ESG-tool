"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Building2, Target, Settings, ChevronRight, ChevronLeft } from "lucide-react"

interface OnboardingWizardProps {
  onComplete: () => void
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    reportingFrequency: "",
    frameworks: [] as string[],
    goals: [] as string[],
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: "frameworks" | "goals", item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter((i) => i !== item) : [...prev[field], item],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Welcome to ESG Platform</h1>
          <p className="text-muted-foreground mt-2">Let's set up your ESG management workspace</p>
        </div>

        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />

            {currentStep === 1 && (
              <>
                <CardTitle className="font-space-grotesk flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>Tell us about your organization</CardDescription>
              </>
            )}

            {currentStep === 2 && (
              <>
                <CardTitle className="font-space-grotesk flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Reporting Preferences
                </CardTitle>
                <CardDescription>Configure your ESG reporting settings</CardDescription>
              </>
            )}

            {currentStep === 3 && (
              <>
                <CardTitle className="font-space-grotesk flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  ESG Goals
                </CardTitle>
                <CardDescription>Set your sustainability objectives</CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software & Technology</SelectItem>
                      <SelectItem value="fintech">Financial Technology</SelectItem>
                      <SelectItem value="consulting">IT Consulting</SelectItem>
                      <SelectItem value="cloud">Cloud Services</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                      <SelectItem value="small">Small (51-200 employees)</SelectItem>
                      <SelectItem value="medium">Medium (201-1000 employees)</SelectItem>
                      <SelectItem value="large">Large (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Reporting Frequency</Label>
                  <Select
                    value={formData.reportingFrequency}
                    onValueChange={(value) => updateFormData("reportingFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How often do you want to report?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>ESG Frameworks (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["GRI Standards", "SASB", "TCFD", "UN Global Compact", "CDP", "DJSI"].map((framework) => (
                      <div key={framework} className="flex items-center space-x-2">
                        <Checkbox
                          id={framework}
                          checked={formData.frameworks.includes(framework)}
                          onCheckedChange={() => toggleArrayItem("frameworks", framework)}
                        />
                        <Label htmlFor={framework} className="text-sm">
                          {framework}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Primary ESG Goals (select your top priorities)</Label>
                  <div className="space-y-3">
                    {[
                      "Reduce carbon footprint",
                      "Improve energy efficiency",
                      "Enhance diversity & inclusion",
                      "Strengthen data privacy",
                      "Improve supply chain sustainability",
                      "Increase employee wellbeing",
                      "Enhance board governance",
                      "Reduce waste generation",
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={() => toggleArrayItem("goals", goal)}
                        />
                        <Label htmlFor={goal} className="text-sm">
                          {goal}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button onClick={handleNext}>
                {currentStep === totalSteps ? "Complete Setup" : "Next"}
                {currentStep !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
