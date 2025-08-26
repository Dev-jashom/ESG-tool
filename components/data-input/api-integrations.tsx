"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, Settings, Wifi, WifiOff, Plus, ExternalLink } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  dataPoints: number
  icon: string
}

export function APIIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Energy Management System",
      description: "Real-time energy consumption data from building management system",
      category: "environmental",
      status: "connected",
      lastSync: "2 minutes ago",
      dataPoints: 1247,
      icon: "⚡",
    },
    {
      id: "2",
      name: "HR Information System",
      description: "Employee data, diversity metrics, and satisfaction surveys",
      category: "social",
      status: "connected",
      lastSync: "1 hour ago",
      dataPoints: 856,
      icon: "👥",
    },
    {
      id: "3",
      name: "Financial ERP",
      description: "Governance metrics, audit trails, and compliance data",
      category: "governance",
      status: "error",
      lastSync: "3 days ago",
      dataPoints: 0,
      icon: "💼",
    },
    {
      id: "4",
      name: "IoT Sensors Network",
      description: "Environmental sensors for air quality, water usage, and waste monitoring",
      category: "environmental",
      status: "disconnected",
      lastSync: "Never",
      dataPoints: 0,
      icon: "📡",
    },
  ])

  const availableIntegrations = [
    {
      name: "Salesforce",
      description: "Customer data and sustainability initiatives",
      category: "social",
      icon: "☁️",
    },
    {
      name: "Microsoft 365",
      description: "Collaboration metrics and digital workplace data",
      category: "social",
      icon: "📊",
    },
    {
      name: "AWS CloudWatch",
      description: "Cloud infrastructure energy consumption and efficiency",
      category: "environmental",
      icon: "☁️",
    },
    {
      name: "Workday",
      description: "HR analytics, diversity reporting, and employee engagement",
      category: "social",
      icon: "👤",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <WifiOff className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      default:
        return <Badge variant="secondary">Disconnected</Badge>
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
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="available">Available Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Connected Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Active API Integrations</CardTitle>
              <CardDescription>Manage your connected data sources and sync settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{integration.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <Badge className={getCategoryColor(integration.category)}>
                            {integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}
                          </Badge>
                          {getStatusBadge(integration.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Last sync: {integration.lastSync}</span>
                          <span>Data points: {integration.dataPoints.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={integration.status === "connected"} />
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sync Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how often data is synchronized from your integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Sync Frequency</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-retry failed syncs</Label>
                      <p className="text-sm text-muted-foreground">Automatically retry when sync fails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data validation</Label>
                      <p className="text-sm text-muted-foreground">Validate data quality before import</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention</Label>
                    <Select defaultValue="2years">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified of sync issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Webhook notifications</Label>
                      <p className="text-sm text-muted-foreground">Send data to external systems</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <Button>Save Settings</Button>
                <Button variant="outline">Test All Connections</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          {/* Available Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>Connect new data sources to automatically import ESG metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableIntegrations.map((integration) => (
                  <div key={integration.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge className={getCategoryColor(integration.category)}>
                          {integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Plus className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom API Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Custom API Integration</CardTitle>
              <CardDescription>Connect your own API endpoints for specialized data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-name">Integration Name</Label>
                    <Input id="api-name" placeholder="My Custom API" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-category">Category</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-endpoint">API Endpoint URL</Label>
                  <Input id="api-endpoint" placeholder="https://api.example.com/esg-data" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" placeholder="Your API key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-method">Authentication Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api-key">API Key</SelectItem>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="oauth">OAuth 2.0</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button>
                    <Wifi className="mr-2 h-4 w-4" />
                    Test Connection
                  </Button>
                  <Button variant="outline">Save Integration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
