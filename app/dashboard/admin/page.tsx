"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/user-management"
import { SystemSettings } from "@/components/admin/system-settings"
import { CompanyProfile } from "@/components/admin/company-profile"
import { IntegrationSettings } from "@/components/admin/integration-settings"

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin & Settings</h1>
          <p className="text-muted-foreground">Manage your ESG platform configuration and users</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <CompanyProfile />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <IntegrationSettings />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
