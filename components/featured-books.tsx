"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ShoppingCart, Heart, TrendingUp, Clock, Award } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { CursorWrapper } from "@/components/cursor-wrapper"

interface Book {
  id: string
  title: string
  author: string
  cover: string
  genre: string
  rating: number
  price: number
  originalPrice?: number
  isNew?: boolean
  isBestseller?: boolean
  description: string
}

export function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "bestsellers">("trending")
  const { addToCart } = useCart()

  const tabs = [
    { id: "trending" as const, label: "Trending Now", icon: TrendingUp },
    { id: "new" as const, label: "New Arrivals", icon: Clock },
    { id: "bestsellers" as const, label: "Bestsellers", icon: Award },
  ]

  useEffect(() => {
    loadBooks(activeTab)
  }, [activeTab])

  const loadBooks = async (category: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setBooks(getMockBooks(category))
      setLoading(false)
    }, 1000)
  }

  const getMockBooks = (category: string): Book[] => {
    const allBooks: Record<string, Book[]> = {
      trending: [
        {
          id: "1",
          title: "Fourth Wing",
          author: "Rebecca Yarros",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Fantasy Romance",
          rating: 4.8,
          price: 18.99,
          originalPrice: 24.99,
          description: "A thrilling fantasy romance about dragon riders and war college.",
        },
        {
          id: "2",
          title: "Tomorrow, and Tomorrow, and Tomorrow",
          author: "Gabrielle Zevin",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Literary Fiction",
          rating: 4.7,
          price: 16.99,
          description: "A novel about friendship, art, and the creative process.",
        },
        {
          id: "3",
          title: "The Atlas Six",
          author: "Olivie Blake",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Dark Academia",
          rating: 4.5,
          price: 17.99,
          description: "Six young magicians compete for a place in an ancient society.",
        },
        {
          id: "4",
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Science Fiction",
          rating: 4.6,
          price: 15.99,
          description: "A story told from the perspective of an artificial friend.",
        },
      ],
      new: [
        {
          id: "5",
          title: "The Woman in Me",
          author: "Britney Spears",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Memoir",
          rating: 4.4,
          price: 19.99,
          isNew: true,
          description: "The pop icon's brave and astonishingly moving story.",
        },
        {
          id: "6",
          title: "Holly",
          author: "Stephen King",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Horror",
          rating: 4.3,
          price: 21.99,
          isNew: true,
          description: "Holly Gibney takes on a pair of dangerous academics.",
        },
        {
          id: "7",
          title: "The Heaven & Earth Grocery Store",
          author: "James McBride",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Historical Fiction",
          rating: 4.5,
          price: 18.99,
          isNew: true,
          description: "A novel about a Jewish family's grocery store in a Black neighborhood.",
        },
        {
          id: "8",
          title: "Tom Lake",
          author: "Ann Patchett",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Literary Fiction",
          rating: 4.6,
          price: 17.99,
          isNew: true,
          description: "A mother tells her daughters the story of her past.",
        },
      ],
      bestsellers: [
        {
          id: "9",
          title: "It Ends with Us",
          author: "Colleen Hoover",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Romance",
          rating: 4.7,
          price: 14.99,
          isBestseller: true,
          description: "A powerful story about love, courage, and the strength to start over.",
        },
        {
          id: "10",
          title: "Where the Crawdads Sing",
          author: "Delia Owens",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Mystery",
          rating: 4.8,
          price: 16.99,
          isBestseller: true,
          description: "A coming-of-age mystery about a young woman in the marshlands.",
        },
        {
          id: "11",
          title: "The Seven Husbands of Evelyn Hugo",
          author: "Taylor Jenkins Reid",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Historical Fiction",
          rating: 4.9,
          price: 15.99,
          isBestseller: true,
          description: "The story of a reclusive Hollywood icon finally ready to tell her story.",
        },
        {
          id: "12",
          title: "Atomic Habits",
          author: "James Clear",
          cover: "/placeholder.svg?height=300&width=200",
          genre: "Self-Help",
          rating: 4.8,
          price: 18.99,
          isBestseller: true,
          description: "An easy and proven way to build good habits and break bad ones.",
        },
      ],
    }
    return allBooks[category] || []
  }

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      cover: book.cover,
      quantity: 1,
    })
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Books</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular, newest, and bestselling books curated just for you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-background rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <CursorWrapper key={tab.id} variant="hover">
                  <Button
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </Button>
                </CursorWrapper>
              )
            })}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-3 w-full mb-4" />
                    <div className="flex justify-between items-center mb-4">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))
            : books.map((book) => (
                <CursorWrapper key={book.id} variant="book">
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 book-card">
                    <div className="relative overflow-hidden">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {book.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                        {book.isBestseller && (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Bestseller</Badge>
                        )}
                      </div>
                      <CursorWrapper variant="heart">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity heart-button"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </CursorWrapper>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {book.genre}
                        </Badge>
                      </div>
                      <CursorWrapper variant="hover">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          <Link href={`/books/${book.id}`}>{book.title}</Link>
                        </h3>
                      </CursorWrapper>
                      <p className="text-muted-foreground text-sm mb-2">{book.author}</p>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{book.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{book.rating}</span>
                        </div>
                        <div className="text-right">
                          {book.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through mr-1">
                              ${book.originalPrice}
                            </span>
                          )}
                          <span className="font-bold text-primary">${book.price}</span>
                        </div>
                      </div>
                      <CursorWrapper variant="hover">
                        <Button className="w-full" onClick={() => handleAddToCart(book)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CursorWrapper>
                    </CardContent>
                  </Card>
                </CursorWrapper>
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <CursorWrapper variant="hover">
            <Button size="lg" variant="outline" asChild>
              <Link href="/books">View All Books</Link>
            </Button>
          </CursorWrapper>
        </div>
      </div>
    </section>
  )
}
