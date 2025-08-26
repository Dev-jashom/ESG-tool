"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Save, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface DataEntry {
  id: string
  metric: string
  value: string
  unit: string
  date: Date
  category: string
  notes: string
}

export function ManualDataEntry() {
  const [selectedCategory, setSelectedCategory] = useState("environmental")
  const [entries, setEntries] = useState<DataEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<Partial<DataEntry>>({
    metric: "",
    value: "",
    unit: "",
    date: new Date(),
    category: "environmental",
    notes: "",
  })

  const environmentalMetrics = [
    { value: "energy-consumption", label: "Energy Consumption", unit: "MWh" },
    { value: "water-usage", label: "Water Usage", unit: "Liters" },
    { value: "waste-generated", label: "Waste Generated", unit: "Tons" },
    { value: "carbon-emissions", label: "Carbon Emissions", unit: "tCO₂e" },
    { value: "renewable-energy", label: "Renewable Energy", unit: "%" },
  ]

  const socialMetrics = [
    { value: "employee-satisfaction", label: "Employee Satisfaction", unit: "Score (1-5)" },
    { value: "training-hours", label: "Training Hours", unit: "Hours" },
    { value: "diversity-ratio", label: "Diversity Ratio", unit: "%" },
    { value: "safety-incidents", label: "Safety Incidents", unit: "Count" },
    { value: "volunteer-hours", label: "Volunteer Hours", unit: "Hours" },
  ]

  const governanceMetrics = [
    { value: "board-diversity", label: "Board Diversity", unit: "%" },
    { value: "policy-updates", label: "Policy Updates", unit: "Count" },
    { value: "audit-findings", label: "Audit Findings", unit: "Count" },
    { value: "compliance-score", label: "Compliance Score", unit: "%" },
    { value: "ethics-training", label: "Ethics Training", unit: "%" },
  ]

  const getMetricsForCategory = (category: string) => {
    switch (category) {
      case "environmental":
        return environmentalMetrics
      case "social":
        return socialMetrics
      case "governance":
        return governanceMetrics
      default:
        return []
    }
  }

  const handleAddEntry = () => {
    if (currentEntry.metric && currentEntry.value) {
      const newEntry: DataEntry = {
        id: Date.now().toString(),
        metric: currentEntry.metric || "",
        value: currentEntry.value || "",
        unit: currentEntry.unit || "",
        date: currentEntry.date || new Date(),
        category: currentEntry.category || "environmental",
        notes: currentEntry.notes || "",
      }
      setEntries([...entries, newEntry])
      setCurrentEntry({
        metric: "",
        value: "",
        unit: "",
        date: new Date(),
        category: selectedCategory,
        notes: "",
      })
    }
  }

  const handleRemoveEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
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
      <Card>
        <CardHeader>
          <CardTitle>Manual Data Entry</CardTitle>
          <CardDescription>Enter ESG metrics and KPIs directly into the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric">Metric</Label>
                  <Select
                    value={currentEntry.metric}
                    onValueChange={(value) => {
                      const metric = getMetricsForCategory(selectedCategory).find((m) => m.value === value)
                      setCurrentEntry({
                        ...currentEntry,
                        metric: value,
                        unit: metric?.unit || "",
                        category: selectedCategory,
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a metric" />
                    </SelectTrigger>
                    <SelectContent>
                      {getMetricsForCategory(selectedCategory).map((metric) => (
                        <SelectItem key={metric.value} value={metric.value}>
                          {metric.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="value"
                      type="number"
                      placeholder="Enter value"
                      value={currentEntry.value}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, value: e.target.value })}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Unit"
                      value={currentEntry.unit}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, unit: e.target.value })}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentEntry.date ? format(currentEntry.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentEntry.date}
                        onSelect={(date) => setCurrentEntry({ ...currentEntry, date: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional context..."
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={handleAddEntry} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Current Session Entries */}
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Session Entries</CardTitle>
            <CardDescription>Review and save your manually entered data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.map((entry) => {
                const metric = getMetricsForCategory(entry.category).find((m) => m.value === entry.metric)
                return (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{metric?.label || entry.metric}</h4>
                        <Badge className={getCategoryColor(entry.category)}>
                          {entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>
                          {entry.value} {entry.unit}
                        </span>
                        <span>{format(entry.date, "MMM dd, yyyy")}</span>
                        {entry.notes && <span>"{entry.notes}"</span>}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveEntry(entry.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>

            <div className="flex space-x-2 mt-6">
              <Button className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save All Entries
              </Button>
              <Button variant="outline" onClick={() => setEntries([])}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Entry Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Entry Templates</CardTitle>
          <CardDescription>Pre-configured forms for common reporting scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Monthly Energy Report",
                description: "Electricity, gas, and renewable energy consumption",
                category: "environmental",
              },
              {
                name: "Quarterly Employee Survey",
                description: "Satisfaction, engagement, and wellbeing metrics",
                category: "social",
              },
              {
                name: "Board Meeting Minutes",
                description: "Governance decisions and policy updates",
                category: "governance",
              },
              {
                name: "Waste Audit Results",
                description: "Waste generation, recycling, and disposal data",
                category: "environmental",
              },
              {
                name: "Training Completion",
                description: "Employee training hours and completion rates",
                category: "social",
              },
              {
                name: "Compliance Checklist",
                description: "Regulatory compliance status and findings",
                category: "governance",
              },
            ].map((template) => (
              <div key={template.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
