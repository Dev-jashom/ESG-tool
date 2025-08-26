"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Settings, CheckCircle, XCircle, RefreshCw, ExternalLink } from "lucide-react"

export function IntegrationSettings() {
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false)

  const integrations = [
    {
      id: 1,
      name: "Salesforce",
      type: "CRM",
      status: "Connected",
      lastSync: "2024-01-15 10:30 AM",
      description: "Customer relationship management data",
      icon: "🔗",
    },
    {
      id: 2,
      name: "Microsoft 365",
      type: "Productivity",
      status: "Connected",
      lastSync: "2024-01-15 09:15 AM",
      description: "Employee productivity and collaboration metrics",
      icon: "📊",
    },
    {
      id: 3,
      name: "AWS CloudWatch",
      type: "Infrastructure",
      status: "Connected",
      lastSync: "2024-01-15 11:00 AM",
      description: "Cloud infrastructure and energy consumption",
      icon: "☁️",
    },
    {
      id: 4,
      name: "Workday",
      type: "HR",
      status: "Disconnected",
      lastSync: "2024-01-10 02:45 PM",
      description: "Human resources and diversity metrics",
      icon: "👥",
    },
    {
      id: 5,
      name: "QuickBooks",
      type: "Finance",
      status: "Connected",
      lastSync: "2024-01-15 08:30 AM",
      description: "Financial data and sustainability investments",
      icon: "💰",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Disconnected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Connected":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        )
      case "Disconnected":
        return <Badge variant="destructive">Disconnected</Badge>
      default:
        return <Badge variant="secondary">Syncing</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Data Integrations</h3>
          <p className="text-sm text-muted-foreground">Connect external systems to automatically sync ESG data</p>
        </div>
        <Dialog open={isAddIntegrationOpen} onOpenChange={setIsAddIntegrationOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
              <DialogDescription>Connect a new data source to your ESG platform.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="integration-type">Integration Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select integration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crm">CRM System</SelectItem>
                    <SelectItem value="hr">HR Platform</SelectItem>
                    <SelectItem value="finance">Finance System</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="productivity">Productivity Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="integration-name">System Name</Label>
                <Input id="integration-name" placeholder="Enter system name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input id="api-endpoint" placeholder="https://api.example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="Enter API key" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddIntegrationOpen(false)}>
                Connect Integration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Integrations List */}
      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      {getStatusIcon(integration.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{integration.type}</Badge>
                  {getStatusBadge(integration.status)}
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Synchronization Settings</CardTitle>
          <CardDescription>Configure how and when data is synchronized</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-sync">Automatic Synchronization</Label>
              <p className="text-sm text-muted-foreground">Enable automatic data sync every 24 hours</p>
            </div>
            <Switch id="auto-sync" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="real-time">Real-time Updates</Label>
              <p className="text-sm text-muted-foreground">Sync data in real-time when available</p>
            </div>
            <Switch id="real-time" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">Sync Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications when sync completes or fails</p>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sync-frequency">Sync Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Every Hour</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* API Access */}
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Manage API keys and external access to your ESG data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Production API Key</h4>
              <p className="text-sm text-muted-foreground">Used for production integrations</p>
            </div>
            <div className="flex items-center space-x-2">
              <code className="text-xs bg-muted px-2 py-1 rounded">esg_prod_••••••••••••</code>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Development API Key</h4>
              <p className="text-sm text-muted-foreground">Used for testing and development</p>
            </div>
            <div className="flex items-center space-x-2">
              <code className="text-xs bg-muted px-2 py-1 rounded">esg_dev_••••••••••••</code>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
