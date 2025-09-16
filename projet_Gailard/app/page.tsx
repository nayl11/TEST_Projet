"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sunrise, Moon, BarChart3, Users } from "lucide-react"
import MorningForm from "@/components/morning-form"
import EveningForm from "@/components/evening-form"
import Dashboard from "@/components/dashboard"

type View = "home" | "morning" | "evening" | "dashboard"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>("home")

  const renderView = () => {
    switch (currentView) {
      case "morning":
        return <MorningForm onBack={() => setCurrentView("home")} />
      case "evening":
        return <EveningForm onBack={() => setCurrentView("home")} />
      case "dashboard":
        return <Dashboard onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Baromètre d'Humeur</h1>
                <p className="text-lg text-muted-foreground">Suivez votre bien-être au quotidien</p>
              </div>

              {/* Main Actions */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentView("morning")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <Sunrise className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Saisie Matinale</CardTitle>
                    <CardDescription>Comment vous sentez-vous ce matin ?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      Commencer la journée
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentView("evening")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                      <Moon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">Bilan du Soir</CardTitle>
                    <CardDescription>Comment s'est passée votre journée ?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="secondary" className="w-full" size="lg">
                      Faire le bilan
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Secondary Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setCurrentView("dashboard")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Tableau de Bord</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Visualisez vos tendances d'humeur</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">Équipe</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Vue d'ensemble de l'équipe (bientôt)</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderView()
}
