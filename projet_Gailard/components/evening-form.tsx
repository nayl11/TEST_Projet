"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface EveningFormProps {
  onBack: () => void
}

const MOOD_EMOJIS = [
  { emoji: "😊", label: "Excellente" },
  { emoji: "🙂", label: "Bonne" },
  { emoji: "😐", label: "Correcte" },
  { emoji: "😔", label: "Difficile" },
  { emoji: "😞", label: "Très difficile" },
]

export default function EveningForm({ onBack }: EveningFormProps) {
  const [firstName, setFirstName] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [satisfaction, setSatisfaction] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("mood_entries")
        .insert({
          employee_name: firstName,
          entry_type: "evening",
          actual_feeling: selectedMood,
          satisfaction_rating: satisfaction,
          comment: comment || null,
          entry_date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
        })
        .select()

      if (error) {
        console.error("[v0] Supabase error:", error)
        throw error
      }

      console.log("[v0] Evening entry saved to Supabase:", data)
      alert("Bilan du soir enregistré avec succès dans la base de données !")
      onBack()
    } catch (error) {
      console.error("[v0] Error saving to database:", error)
      alert("Erreur lors de l'enregistrement en base de données. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setSatisfaction(i + 1)}
        className="transition-colors hover:scale-110"
      >
        <Star className={`h-8 w-8 ${i < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} />
      </button>
    ))
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Bilan du Soir</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🌙</span>
              Comment s'est passée votre journée ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                  required
                />
              </div>

              {/* Ressenti de la journée */}
              <div className="space-y-3">
                <Label>Comment s'est passée votre journée ?</Label>
                <div className="grid grid-cols-5 gap-3">
                  {MOOD_EMOJIS.map((mood) => (
                    <button
                      key={mood.emoji}
                      type="button"
                      onClick={() => setSelectedMood(mood.emoji)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedMood === mood.emoji
                          ? "border-secondary bg-secondary/10"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      <div className="text-3xl mb-1">{mood.emoji}</div>
                      <div className="text-xs text-muted-foreground">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note de satisfaction */}
              <div className="space-y-3">
                <Label>Note de satisfaction (1-5 étoiles)</Label>
                <div className="flex items-center gap-1">
                  {renderStars(satisfaction)}
                  <span className="ml-3 text-sm text-muted-foreground">
                    {satisfaction > 0 ? `${satisfaction}/5` : "Non noté"}
                  </span>
                </div>
              </div>

              {/* Commentaire libre */}
              <div className="space-y-2">
                <Label htmlFor="comment">Commentaire libre (optionnel)</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez vos réflexions sur cette journée..."
                  rows={4}
                />
              </div>

              <Button type="submit" variant="secondary" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "Enregistrer mon bilan du soir"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
