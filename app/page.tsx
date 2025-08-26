"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { OnboardingWizard } from "@/components/auth/onboarding-wizard"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    // In a real app, this would redirect to the dashboard
    window.location.href = "/dashboard"
  }

  if (isAuthenticated && showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to ESG Platform</h1>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return <LoginForm onLogin={handleLogin} />
}
