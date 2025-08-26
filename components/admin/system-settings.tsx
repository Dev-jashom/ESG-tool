"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, Bell, Database, Download, Upload } from "lucide-react"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure basic system preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                  <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select defaultValue="mm-dd-yyyy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="cad">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Settings</span>
          </CardTitle>
          <CardDescription>Manage security and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
            </div>
            <Switch id="two-factor" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="session-timeout">Auto Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
            </div>
            <Switch id="session-timeout" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-duration">Session Duration</Label>
            <Select defaultValue="8">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="audit-logging">Audit Logging</Label>
              <p className="text-sm text-muted-foreground">Log all user actions and system events</p>
            </div>
            <Switch id="audit-logging" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>Configure system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-alerts">Data Quality Alerts</Label>
              <p className="text-sm text-muted-foreground">Alert when data quality issues are detected</p>
            </div>
            <Switch id="data-alerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compliance-reminders">Compliance Reminders</Label>
              <p className="text-sm text-muted-foreground">Remind users of upcoming compliance deadlines</p>
            </div>
            <Switch id="compliance-reminders" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-frequency">Notification Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Data Management</span>
          </CardTitle>
          <CardDescription>Manage data retention and backup settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="data-retention">Data Retention Period</Label>
            <Select defaultValue="7">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 year</SelectItem>
                <SelectItem value="3">3 years</SelectItem>
                <SelectItem value="5">5 years</SelectItem>
                <SelectItem value="7">7 years</SelectItem>
                <SelectItem value="10">10 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-backup">Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">Create daily backups of all data</p>
            </div>
            <Switch id="auto-backup" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Export Data</h4>
              <p className="text-sm text-muted-foreground">Download a complete backup of your data</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Import Data</h4>
              <p className="text-sm text-muted-foreground">Import data from external sources</p>
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system health and performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1.2TB</div>
              <div className="text-sm text-muted-foreground">Data Storage</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">847</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-800">All systems operational</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
