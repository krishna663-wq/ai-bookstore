"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, Heart, Brain, BookOpen, ArrowRight, RefreshCw, ShoppingCart } from "lucide-react"
import { generateMoodRecommendations, analyzeMoodFromText } from "@/lib/ai-recommendations"
import { useCart } from "@/components/cart-provider"
import { useSearchParams } from "next/navigation"

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

export default function MoodFinderPage() {
  const [currentMood, setCurrentMood] = useState("")
  const [moodText, setMoodText] = useState("")
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const { addToCart } = useCart()
  const searchParams = useSearchParams()

  const predefinedMoods = [
    { name: "Happy", emoji: "😊", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { name: "Adventurous", emoji: "🗺️", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { name: "Romantic", emoji: "💕", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
    { name: "Mysterious", emoji: "🔍", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    { name: "Thoughtful", emoji: "🤔", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    { name: "Cozy", emoji: "☕", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    { name: "Energetic", emoji: "⚡", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    { name: "Melancholic", emoji: "🌧️", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" },
  ]

  useEffect(() => {
    const mood = searchParams.get("mood")
    if (mood) {
      setCurrentMood(mood)
      loadRecommendations(mood)
    }
  }, [searchParams])

  const loadRecommendations = async (mood: string) => {
    if (!mood.trim()) return

    setLoading(true)
    try {
      const books = await generateMoodRecommendations(mood)
      setRecommendations(books)
    } catch (error) {
      console.error("Failed to load recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const analyzeMood = async () => {
    if (!moodText.trim()) return

    setAnalyzing(true)
    try {
      const detectedMood = await analyzeMoodFromText(moodText)
      setCurrentMood(detectedMood)
      await loadRecommendations(detectedMood)
    } catch (error) {
      console.error("Failed to analyze mood:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood)
    loadRecommendations(mood)
  }

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      cover: book.cover,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold">AI Mood Finder</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us how you're feeling, and our AI will recommend the perfect books to match your mood.
          </p>
        </div>

        {/* Mood Input Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Mood Selection */}
              <div>
                <h3 className="font-medium mb-3">Quick mood selection:</h3>
                <div className="flex flex-wrap gap-2">
                  {predefinedMoods.map((mood) => (
                    <Button
                      key={mood.name}
                      variant={currentMood === mood.name ? "default" : "outline"}
                      className="h-auto p-3"
                      onClick={() => handleMoodSelect(mood.name)}
                    >
                      <span className="mr-2">{mood.emoji}</span>
                      {mood.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Text Analysis */}
              <div className="space-y-3">
                <h3 className="font-medium">Or describe your mood in detail:</h3>
                <Textarea
                  placeholder="I'm feeling excited about starting something new, but also a bit nervous about the challenges ahead..."
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={analyzeMood} disabled={!moodText.trim() || analyzing} className="w-full sm:w-auto">
                  {analyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing your mood...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze My Mood
                    </>
                  )}
                </Button>
              </div>

              {/* Manual Mood Input */}
              <div className="space-y-3">
                <h3 className="font-medium">Or enter a specific mood:</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g., nostalgic, hopeful, curious..."
                    value={currentMood}
                    onChange={(e) => setCurrentMood(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && loadRecommendations(currentMood)}
                  />
                  <Button onClick={() => loadRecommendations(currentMood)} disabled={!currentMood.trim() || loading}>
                    Find Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Mood Display */}
        {currentMood && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-medium">
                Current mood: <span className="text-primary font-semibold">{currentMood}</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => loadRecommendations(currentMood)}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {(loading || recommendations.length > 0) && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Perfect Books for Your Mood</h2>
              <p className="text-muted-foreground">
                Our AI has curated these books specifically for how you're feeling right now.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <Skeleton className="h-64 w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2 mb-4" />
                        <div className="flex justify-between items-center mb-4">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-9 w-full" />
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
                          <Badge className="bg-primary/90 text-primary-foreground">{book.mood}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">
                            {book.genre}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium">{book.rating}</span>
                          </div>
                          <span className="font-bold text-primary">${book.price}</span>
                        </div>
                        <Button className="w-full" onClick={() => handleAddToCart(book)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">How Our AI Mood Finder Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Mood Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes your mood description using advanced natural language processing.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Smart Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    We match your emotional state with books that complement or enhance your mood.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Perfect Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized book suggestions that are perfect for your current emotional state.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
