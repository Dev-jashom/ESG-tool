"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "upload",
      title: "Q2 Energy Report uploaded",
      description: "Monthly energy consumption data",
      user: "Sarah Chen",
      userAvatar: "/professional-woman-diverse.png",
      time: "2 hours ago",
      status: "completed",
      icon: Upload,
    },
    {
      id: 2,
      type: "report",
      title: "ESG Report generated",
      description: "Quarterly sustainability report",
      user: "Mike Johnson",
      userAvatar: "/professional-man.png",
      time: "4 hours ago",
      status: "completed",
      icon: FileText,
    },
    {
      id: 3,
      type: "alert",
      title: "Compliance gap identified",
      description: "TCFD disclosure requirements",
      user: "System",
      userAvatar: null,
      time: "6 hours ago",
      status: "warning",
      icon: AlertCircle,
    },
    {
      id: 4,
      type: "approval",
      title: "Carbon offset purchase approved",
      description: "1,000 tCO₂e offset credits",
      user: "David Park",
      userAvatar: "/professional-asian-man.png",
      time: "1 day ago",
      status: "completed",
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "pending",
      title: "Board meeting preparation",
      description: "ESG presentation materials",
      user: "Lisa Wang",
      userAvatar: "/professional-asian-woman.png",
      time: "2 days ago",
      status: "pending",
      icon: Clock,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getIconColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "pending":
        return "text-blue-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and actions in your ESG workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-full bg-muted ${getIconColor(activity.status)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {activity.userAvatar ? (
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={activity.userAvatar || "/placeholder.svg"} alt={activity.user} />
                        <AvatarFallback className="text-xs">
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">S</span>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
