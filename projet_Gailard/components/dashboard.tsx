"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Calendar, Smile, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DashboardProps {
  onBack: () => void
}

interface MoodEntry {
  id: string
  employee_name: string
  entry_type: "morning" | "evening"
  predicted_mood?: string
  energy_level?: number
  mood_color?: string
  actual_feeling?: string
  satisfaction_rating?: number
  comment?: string
  created_at: string
  entry_date: string
}

interface DashboardStats {
  weeklyAverage: number
  totalEntries: number
  currentStreak: number
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    weeklyAverage: 0,
    totalEntries: 0,
    currentStreak: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const supabase = createClient()

      // Fetch all mood entries from Supabase
      const { data: allEntries, error } = await supabase
        .from("mood_entries")
        .select("*")
        .order("entry_date", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching mood entries:", error)
        throw error
      }

      console.log("[v0] Loaded entries from Supabase:", allEntries)

      // Sort entries by date and type for display
      const sortedEntries = (allEntries || []).sort((a, b) => {
        const dateCompare = new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
        if (dateCompare !== 0) return dateCompare
        return a.entry_type === "morning" ? -1 : 1
      })

      setRecentEntries(sortedEntries.slice(0, 10))

      if (allEntries && allEntries.length > 0) {
        // Calculate weekly average satisfaction
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        const weeklyEntries = allEntries.filter(
          (entry) =>
            entry.entry_type === "evening" && entry.satisfaction_rating && new Date(entry.entry_date) >= weekAgo,
        )

        const weeklyAverage =
          weeklyEntries.length > 0
            ? weeklyEntries.reduce((sum, entry) => sum + (entry.satisfaction_rating || 0), 0) / weeklyEntries.length
            : 0

        // Calculate current streak (consecutive days with entries)
        const uniqueDates = [...new Set(allEntries.map((entry) => entry.entry_date))].sort().reverse()
        let streak = 0

        for (let i = 0; i < uniqueDates.length; i++) {
          const expectedDate = new Date()
          expectedDate.setDate(expectedDate.getDate() - i)
          const expectedDateStr = expectedDate.toISOString().split("T")[0]

          if (uniqueDates[i] === expectedDateStr) {
            streak++
          } else {
            break
          }
        }

        setStats({
          weeklyAverage: Math.round(weeklyAverage * 10) / 10,
          totalEntries: allEntries.length,
          currentStreak: streak,
        })
      }
    } catch (error) {
      console.error("[v0] Error loading dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return <span className="text-sm text-muted-foreground">-</span>

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="text-yellow-400">
            ⭐
          </span>
        ))}
        <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Tableau de Bord</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Tableau de Bord</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne Hebdomadaire</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.weeklyAverage > 0 ? `${stats.weeklyAverage}/5` : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Satisfaction moyenne cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saisies Totales</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.totalEntries}</div>
              <p className="text-xs text-muted-foreground">Toutes les saisies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Série Actuelle</CardTitle>
              <Smile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.currentStreak} jours</div>
              <p className="text-xs text-muted-foreground">
                {stats.currentStreak > 0 ? "Continuez comme ça !" : "Commencez votre série !"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Saisies Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune saisie trouvée</p>
                <p className="text-sm">Commencez par faire votre première saisie matinale !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentEntries.map((entry, index) => (
                  <div
                    key={`${entry.id}-${index}`}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-muted-foreground min-w-[80px]">
                        {formatDate(entry.entry_date)}
                      </div>
                      <div className="text-sm font-medium text-foreground min-w-[80px]">{entry.employee_name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground min-w-[50px]">
                          {entry.entry_type === "morning" ? "Matin:" : "Soir:"}
                        </span>
                        <span className="text-lg">
                          {entry.entry_type === "morning" ? entry.predicted_mood : entry.actual_feeling}
                        </span>
                      </div>
                      {entry.entry_type === "morning" && entry.energy_level && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Énergie:</span>
                          <span className="text-sm">{entry.energy_level}/5</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {entry.entry_type === "evening" && renderStars(entry.satisfaction_rating)}
                      {entry.entry_type === "morning" && entry.mood_color && (
                        <div
                          className="w-6 h-6 rounded-full border-2 border-border"
                          style={{ backgroundColor: entry.mood_color }}
                          title="Couleur du moment"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Placeholder for future charts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Évolution de l'Humeur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Graphiques d'évolution à venir</p>
                <p className="text-sm">Continuez à saisir vos humeurs pour voir les tendances</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
