"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, BookOpen, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [mood, setMood] = useState("")

  const popularMoods = [
    { name: "Happy", emoji: "😊", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { name: "Adventurous", emoji: "🗺️", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { name: "Romantic", emoji: "💕", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
    { name: "Mysterious", emoji: "🔍", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    { name: "Thoughtful", emoji: "🤔", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-50/50 to-pink-50/30 dark:from-primary/10 dark:via-purple-950/20 dark:to-pink-950/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="mr-2 h-3 w-3" />
                AI-Powered Recommendations
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Find Books That Match Your{" "}
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mood
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                Discover your next favorite read with our AI-powered mood-based recommendations. Tell us how you're
                feeling, and we'll find the perfect book for you.
              </p>
            </div>

            {/* Mood Input */}
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="How are you feeling today?"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="flex-1 h-12 text-lg"
                />
                <Button size="lg" className="h-12 px-6" asChild>
                  <Link href={`/mood-finder${mood ? `?mood=${encodeURIComponent(mood)}` : ""}`}>
                    Find Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Popular moods:</span>
                {popularMoods.map((moodItem) => (
                  <Badge
                    key={moodItem.name}
                    variant="secondary"
                    className={`cursor-pointer hover:scale-105 transition-transform ${moodItem.color}`}
                    onClick={() => setMood(moodItem.name)}
                  >
                    {moodItem.emoji} {moodItem.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Books Available</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/10 rounded-full mb-2 mx-auto">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Readers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mb-2 mx-auto">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Match Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Book Showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Featured Books */}
              {[
                {
                  title: "The Midnight Library",
                  author: "Matt Haig",
                  mood: "Thoughtful",
                  color: "from-blue-400 to-purple-600",
                },
                { title: "Beach Read", author: "Emily Henry", mood: "Happy", color: "from-yellow-400 to-orange-500" },
                {
                  title: "The Seven Husbands",
                  author: "Taylor Jenkins Reid",
                  mood: "Romantic",
                  color: "from-pink-400 to-red-500",
                },
                { title: "Gone Girl", author: "Gillian Flynn", mood: "Mysterious", color: "from-gray-600 to-gray-800" },
              ].map((book, index) => (
                <div
                  key={index}
                  className={`relative h-64 rounded-lg bg-gradient-to-br ${book.color} p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs">
                      {book.mood}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-sm opacity-90">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
