"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComplianceChecklist } from "@/components/compliance/compliance-checklist"
import { AuditTrail } from "@/components/compliance/audit-trail"
import { CertificationManager } from "@/components/compliance/certification-manager"
import { RegulatoryUpdates } from "@/components/compliance/regulatory-updates"
import { Shield, FileSearch, Award, Bell } from "lucide-react"

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState("checklist")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">Compliance & Audit</h1>
          <p className="text-muted-foreground">
            Manage compliance requirements, track audit trails, and maintain certifications
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="checklist" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Checklist</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-2">
              <FileSearch className="h-4 w-4" />
              <span>Audit Trail</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Certifications</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Regulatory Updates</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-6">
            <ComplianceChecklist />
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditTrail />
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <CertificationManager />
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            <RegulatoryUpdates />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
