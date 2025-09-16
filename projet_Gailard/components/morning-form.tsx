"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Battery } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface MorningFormProps {
  onBack: () => void
}

const MOOD_EMOJIS = [
  { emoji: "😊", label: "Très bien" },
  { emoji: "🙂", label: "Bien" },
  { emoji: "😐", label: "Neutre" },
  { emoji: "😔", label: "Pas terrible" },
  { emoji: "😞", label: "Difficile" },
]

const COLORS = [
  { color: "#ef4444", name: "Rouge" },
  { color: "#f97316", name: "Orange" },
  { color: "#eab308", name: "Jaune" },
  { color: "#22c55e", name: "Vert" },
  { color: "#3b82f6", name: "Bleu" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#ec4899", name: "Rose" },
]

export default function MorningForm({ onBack }: MorningFormProps) {
  const [firstName, setFirstName] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [energyLevel, setEnergyLevel] = useState(3)
  const [selectedColor, setSelectedColor] = useState("")
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
          entry_type: "morning",
          predicted_mood: selectedMood,
          energy_level: energyLevel,
          mood_color: selectedColor,
          entry_date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
        })
        .select()

      if (error) {
        console.error("[v0] Supabase error:", error)
        throw error
      }

      console.log("[v0] Morning entry saved to Supabase:", data)
      alert("Saisie matinale enregistrée avec succès dans la base de données !")
      onBack()
    } catch (error) {
      console.error("[v0] Error saving to database:", error)
      alert("Erreur lors de l'enregistrement en base de données. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderBatteryIcons = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Battery key={i} className={`h-6 w-6 ${i < level ? "text-primary fill-current" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Saisie Matinale</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🌅</span>
              Comment commencez-vous cette journée ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prénom */}
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

              {/* Humeur prévue */}
              <div className="space-y-3">
                <Label>Humeur prévue pour aujourd'hui</Label>
                <div className="grid grid-cols-5 gap-3">
                  {MOOD_EMOJIS.map((mood) => (
                    <button
                      key={mood.emoji}
                      type="button"
                      onClick={() => setSelectedMood(mood.emoji)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedMood === mood.emoji
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-1">{mood.emoji}</div>
                      <div className="text-xs text-muted-foreground">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Niveau d'énergie */}
              <div className="space-y-3">
                <Label>Niveau d'énergie (1-5)</Label>
                <div className="flex items-center gap-2">
                  {renderBatteryIcons(energyLevel)}
                  <span className="ml-2 text-sm text-muted-foreground">{energyLevel}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Couleur du moment */}
              <div className="space-y-3">
                <Label>Couleur du moment</Label>
                <div className="grid grid-cols-7 gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color.color}
                      type="button"
                      onClick={() => setSelectedColor(color.color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
                        selectedColor === color.color ? "border-foreground" : "border-border"
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "Enregistrer ma saisie matinale"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
