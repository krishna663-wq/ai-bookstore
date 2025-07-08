"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, Sparkles, RefreshCw } from "lucide-react"
import Link from "next/link"
import { generateMoodRecommendations } from "@/lib/ai-recommendations"

interface Book {
  id: string
  title: string
  author: string
  cover: string
  genre: string
  mood: string
  rating: number
  price: number
}

export function MoodRecommendations() {
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMood, setCurrentMood] = useState("Happy")

  const moods = [
    { name: "Happy", emoji: "😊", description: "Uplifting and joyful stories" },
    { name: "Adventurous", emoji: "🗺️", description: "Thrilling journeys and quests" },
    { name: "Romantic", emoji: "💕", description: "Love stories and relationships" },
    { name: "Mysterious", emoji: "🔍", description: "Suspense and intrigue" },
    { name: "Thoughtful", emoji: "🤔", description: "Deep and philosophical reads" },
    { name: "Cozy", emoji: "☕", description: "Comfort reads and gentle stories" },
  ]

  useEffect(() => {
    loadRecommendations(currentMood)
  }, [currentMood])

  const loadRecommendations = async (mood: string) => {
    setLoading(true)
    try {
      const books = await generateMoodRecommendations(mood)
      setRecommendations(books)
    } catch (error) {
      console.error("Failed to load recommendations:", error)
      // Fallback to mock data
      setRecommendations(getMockRecommendations(mood))
    } finally {
      setLoading(false)
    }
  }

  const getMockRecommendations = (mood: string): Book[] => {
    const mockBooks: Record<string, Book[]> = {
      Happy: [
        {
          id: "1",
          title: "The House in the Cerulean Sea",
          author: "TJ Klune",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Fantasy",
          mood: "Happy",
          rating: 4.8,
          price: 14.99,
        },
        {
          id: "2",
          title: "Beach Read",
          author: "Emily Henry",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Romance",
          mood: "Happy",
          rating: 4.6,
          price: 13.99,
        },
        {
          id: "3",
          title: "The Midnight Library",
          author: "Matt Haig",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Fiction",
          mood: "Happy",
          rating: 4.7,
          price: 15.99,
        },
        {
          id: "4",
          title: "Anxious People",
          author: "Fredrik Backman",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Fiction",
          mood: "Happy",
          rating: 4.5,
          price: 16.99,
        },
      ],
      Adventurous: [
        {
          id: "5",
          title: "The Name of the Wind",
          author: "Patrick Rothfuss",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Fantasy",
          mood: "Adventurous",
          rating: 4.9,
          price: 17.99,
        },
        {
          id: "6",
          title: "Into the Wild",
          author: "Jon Krakauer",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Non-fiction",
          mood: "Adventurous",
          rating: 4.4,
          price: 14.99,
        },
        {
          id: "7",
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Fantasy",
          mood: "Adventurous",
          rating: 4.8,
          price: 12.99,
        },
        {
          id: "8",
          title: "Wild",
          author: "Cheryl Strayed",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Memoir",
          mood: "Adventurous",
          rating: 4.3,
          price: 15.99,
        },
      ],
      // Add more moods...
    }
    return mockBooks[mood] || mockBooks.Happy
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl lg:text-4xl font-bold">Books for Your Mood</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes your mood and recommends books that perfectly match how you're feeling right now.
          </p>
        </div>

        {/* Mood Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {moods.map((mood) => (
            <Button
              key={mood.name}
              variant={currentMood === mood.name ? "default" : "outline"}
              className="h-auto p-4 flex flex-col items-center space-y-1 min-w-[120px]"
              onClick={() => setCurrentMood(mood.name)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="font-medium">{mood.name}</span>
              <span className="text-xs opacity-70 text-center">{mood.description}</span>
            </Button>
          ))}
        </div>

        {/* Current Mood Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <span className="text-2xl">{moods.find((m) => m.name === currentMood)?.emoji}</span>
            <span className="font-medium">Feeling {currentMood.toLowerCase()}? Here are your perfect matches!</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => loadRecommendations(currentMood)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Book Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : recommendations.map((book) => (
                <Card
                  key={book.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-black">
                        {book.mood}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <span className="font-bold text-primary">${book.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href={`/mood-finder?mood=${currentMood}`}>
              Explore More {currentMood} Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
