"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploadSection } from "@/components/data-input/file-upload-section"
import { ManualDataEntry } from "@/components/data-input/manual-data-entry"
import { APIIntegrations } from "@/components/data-input/api-integrations"
import { SurveyForms } from "@/components/data-input/survey-forms"
import { Upload, Edit, Zap, ClipboardList } from "lucide-react"

export default function DataInputPage() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">ESG Data Input</h1>
          <p className="text-muted-foreground">Upload reports, enter data manually, or connect external sources</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>File Upload</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Manual Entry</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>API Integration</span>
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4" />
              <span>Surveys</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <FileUploadSection />
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <ManualDataEntry />
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <APIIntegrations />
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <SurveyForms />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
