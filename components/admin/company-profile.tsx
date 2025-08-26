"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

export function CompanyProfile() {
  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Company Information</span>
          </CardTitle>
          <CardDescription>Basic company details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="TechCorp Solutions" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select defaultValue="technology">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters</Label>
              <Input id="headquarters" defaultValue="San Francisco, CA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded">Founded</Label>
              <Input id="founded" defaultValue="2015" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Select defaultValue="1000-5000">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-1000">201-1000</SelectItem>
                  <SelectItem value="1000-5000">1000-5000</SelectItem>
                  <SelectItem value="5000+">5000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://techcorp.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              defaultValue="TechCorp Solutions is a leading technology company focused on sustainable innovation and digital transformation."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* ESG Commitments */}
      <Card>
        <CardHeader>
          <CardTitle>ESG Commitments & Goals</CardTitle>
          <CardDescription>Define your sustainability targets and commitments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="carbon-neutral">Carbon Neutral Target</Label>
              <Select defaultValue="2030">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2030">2030</SelectItem>
                  <SelectItem value="2035">2035</SelectItem>
                  <SelectItem value="2040">2040</SelectItem>
                  <SelectItem value="2050">2050</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="renewable-energy">Renewable Energy Target</Label>
              <Select defaultValue="100">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Current Certifications</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">B Corp Certified</Badge>
              <Badge variant="secondary">ISO 14001</Badge>
              <Badge variant="secondary">LEED Platinum</Badge>
              <Badge variant="secondary">Carbon Trust Standard</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sustainability-policy">Sustainability Policy</Label>
            <Textarea
              id="sustainability-policy"
              placeholder="Describe your company's sustainability policy and commitments..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Primary contacts for ESG reporting and inquiries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primary-contact">Primary ESG Contact</Label>
              <Input id="primary-contact" defaultValue="Sarah Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" defaultValue="esg@techcorp.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investor-relations">Investor Relations</Label>
              <Input id="investor-relations" defaultValue="ir@techcorp.com" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
