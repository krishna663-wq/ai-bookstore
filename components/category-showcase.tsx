"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Sword, Microscope, Skull, Sparkles, BookOpen, Users, Briefcase, Compass, Coffee } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  bookCount: number
  color: string
  gradient: string
  popularBooks: string[]
}

export function CategoryShowcase() {
  const categories: Category[] = [
    {
      id: "romance",
      name: "Romance",
      description: "Love stories that warm the heart",
      icon: Heart,
      bookCount: 1250,
      color: "text-pink-600",
      gradient: "from-pink-500 to-rose-500",
      popularBooks: ["It Ends with Us", "The Hating Game", "Beach Read"],
    },
    {
      id: "fantasy",
      name: "Fantasy",
      description: "Magical worlds and epic adventures",
      icon: Sword,
      bookCount: 980,
      color: "text-purple-600",
      gradient: "from-purple-500 to-indigo-500",
      popularBooks: ["Fourth Wing", "The Name of the Wind", "The Hobbit"],
    },
    {
      id: "science-fiction",
      name: "Science Fiction",
      description: "Future worlds and technological wonders",
      icon: Microscope,
      bookCount: 750,
      color: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
      popularBooks: ["Dune", "The Martian", "Klara and the Sun"],
    },
    {
      id: "mystery-thriller",
      name: "Mystery & Thriller",
      description: "Suspenseful tales that keep you guessing",
      icon: Skull,
      bookCount: 890,
      color: "text-gray-700",
      gradient: "from-gray-600 to-gray-800",
      popularBooks: ["Gone Girl", "The Girl with the Dragon Tattoo", "Big Little Lies"],
    },
    {
      id: "literary-fiction",
      name: "Literary Fiction",
      description: "Thought-provoking and beautifully written",
      icon: Sparkles,
      bookCount: 650,
      color: "text-emerald-600",
      gradient: "from-emerald-500 to-teal-500",
      popularBooks: ["The Seven Husbands of Evelyn Hugo", "Circe", "The Midnight Library"],
    },
    {
      id: "non-fiction",
      name: "Non-Fiction",
      description: "Real stories and educational content",
      icon: BookOpen,
      bookCount: 1100,
      color: "text-orange-600",
      gradient: "from-orange-500 to-red-500",
      popularBooks: ["Atomic Habits", "Educated", "Becoming"],
    },
    {
      id: "biography",
      name: "Biography",
      description: "Life stories of remarkable people",
      icon: Users,
      bookCount: 420,
      color: "text-yellow-600",
      gradient: "from-yellow-500 to-orange-500",
      popularBooks: ["Steve Jobs", "The Woman in Me", "Born a Crime"],
    },
    {
      id: "business",
      name: "Business",
      description: "Professional development and entrepreneurship",
      icon: Briefcase,
      bookCount: 380,
      color: "text-slate-600",
      gradient: "from-slate-500 to-gray-600",
      popularBooks: ["Good to Great", "The Lean Startup", "Think and Grow Rich"],
    },
    {
      id: "travel",
      name: "Travel",
      description: "Adventures and cultural explorations",
      icon: Compass,
      bookCount: 290,
      color: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
      popularBooks: ["Wild", "Eat, Pray, Love", "Into the Wild"],
    },
    {
      id: "cozy",
      name: "Cozy Reads",
      description: "Comfort books for relaxing moments",
      icon: Coffee,
      bookCount: 340,
      color: "text-amber-600",
      gradient: "from-amber-500 to-yellow-500",
      popularBooks: ["The House in the Cerulean Sea", "Anxious People", "The Midnight Library"],
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into your favorite genres and discover new worlds of storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${category.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {category.bookCount}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Popular titles:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.popularBooks.slice(0, 2).map((book, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {book}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Featured Category Highlight */}
        <div className="mt-16">
          <Card className="overflow-hidden bg-gradient-to-r from-primary/10 via-purple-50/50 to-pink-50/30 dark:from-primary/20 dark:via-purple-950/30 dark:to-pink-950/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4">Featured Category</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">AI-Curated Collections</h3>
                  <p className="text-muted-foreground mb-6">
                    Discover books through our intelligent mood-based recommendations. Our AI analyzes your preferences
                    and emotional state to suggest the perfect reads for any moment.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Mood-Based", "Personalized", "Smart Curation", "Emotional Intelligence"].map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href="/mood-finder">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">Try Mood-Based Recommendations</p>
                          <p className="text-sm text-muted-foreground">Find books that match your current feeling</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { mood: "Happy", color: "from-yellow-400 to-orange-500", books: "1,200+" },
                    { mood: "Adventurous", color: "from-green-400 to-blue-500", books: "800+" },
                    { mood: "Romantic", color: "from-pink-400 to-red-500", books: "1,500+" },
                    { mood: "Mysterious", color: "from-purple-400 to-indigo-500", books: "900+" },
                  ].map((item) => (
                    <div key={item.mood} className={`p-4 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                      <p className="font-semibold">{item.mood}</p>
                      <p className="text-sm opacity-90">{item.books} books</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
