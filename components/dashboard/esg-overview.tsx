"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react"

interface ESGOverviewProps {
  timeframe: string
  onTimeframeChange: (value: string) => void
}

export function ESGOverview({ timeframe, onTimeframeChange }: ESGOverviewProps) {
  const esgScore = 78
  const previousScore = 72
  const trend = esgScore > previousScore ? "up" : esgScore < previousScore ? "down" : "stable"
  const trendValue = Math.abs(esgScore - previousScore)

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">ESG Dashboard</h1>
          <p className="text-muted-foreground">Monitor your environmental, social, and governance performance</p>
        </div>
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="annually">Annually</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall ESG Score */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall ESG Score</CardTitle>
            <CardDescription>Composite score across all ESG metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-4xl font-bold ${getScoreColor(esgScore)}`}>{esgScore}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon()}
                    <span className="text-sm text-muted-foreground">{trend !== "stable" && `${trendValue} pts`}</span>
                  </div>
                </div>
                <Progress value={esgScore} className="mt-3" />
              </div>
              <div className="text-right">
                <Badge variant={esgScore >= 80 ? "default" : esgScore >= 60 ? "secondary" : "destructive"}>
                  {esgScore >= 80 ? "Excellent" : esgScore >= 60 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              Environmental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">82</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+4</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">Carbon footprint reduced by 15%</p>
            </div>
          </CardContent>
        </Card>

        {/* Social Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
              Social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">76</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+2</span>
              </div>
              <Progress value={76} className="h-2" />
              <p className="text-xs text-muted-foreground">Diversity initiatives improving</p>
            </div>
          </CardContent>
        </Card>

        {/* Governance Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
              Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">74</span>
                <Minus className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">0</span>
              </div>
              <Progress value={74} className="h-2" />
              <p className="text-xs text-muted-foreground">Board policies updated</p>
            </div>
          </CardContent>
        </Card>

        {/* Target Achievement */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Target Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">68%</span>
                <span className="text-sm text-muted-foreground">of goals</span>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">17 of 25 targets on track</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
