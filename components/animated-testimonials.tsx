"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, Heart, BookOpen } from "lucide-react"

export function AnimatedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Book Enthusiast",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      mood: "Adventurous",
      quote:
        "BookMood's AI perfectly understood my craving for adventure stories. I discovered three amazing fantasy series that I never would have found otherwise!",
      books: ["The Name of the Wind", "Six of Crows", "The Priory of the Orange Tree"],
      color: "from-green-400 to-blue-500",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Busy Professional",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      mood: "Thoughtful",
      quote:
        "As someone with limited reading time, BookMood helps me find exactly what I need. The mood-based recommendations are incredibly accurate!",
      books: ["Atomic Habits", "Sapiens", "The Power of Now"],
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Romance Reader",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      mood: "Romantic",
      quote:
        "I was in a reading slump until BookMood suggested books based on my romantic mood. Now I can't stop reading! The AI really gets me.",
      books: ["Beach Read", "The Hating Game", "It Ends with Us"],
      color: "from-pink-400 to-red-500",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Mystery Lover",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      mood: "Mysterious",
      quote:
        "The mystery recommendations are spot-on! BookMood introduced me to authors I'd never heard of, and they're now among my favorites.",
      books: ["Gone Girl", "The Silent Patient", "Big Little Lies"],
      color: "from-gray-600 to-purple-600",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Cozy Reader",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      mood: "Cozy",
      quote:
        "When I need comfort reads, BookMood always delivers. It's like having a personal librarian who knows exactly what will make me feel better.",
      books: ["The Thursday Murder Club", "A Man Called Ove", "Eleanor Oliphant"],
      color: "from-orange-400 to-yellow-500",
    },
  ]

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4">
              <Heart className="mr-2 h-3 w-3" />
              Reader Stories
            </Badge>
          </motion.div>

          <motion.h2 className="text-4xl lg:text-5xl font-bold mb-6" variants={itemVariants}>
            What Our Readers Say
          </motion.h2>

          <motion.p className="text-xl text-muted-foreground max-w-3xl mx-auto" variants={itemVariants}>
            Join thousands of happy readers who've discovered their perfect books through BookMood's AI-powered
            recommendations.
          </motion.p>
        </motion.div>

        {/* Main testimonial display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="relative overflow-hidden border-0 shadow-2xl">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonials[currentIndex].color} opacity-5`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />

                  <CardContent className="p-12 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Avatar and info */}
                      <motion.div
                        className="flex-shrink-0 text-center lg:text-left"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <Avatar className="w-20 h-20 mx-auto lg:mx-0 mb-4 ring-4 ring-primary/20">
                          <AvatarImage src={testimonials[currentIndex].avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg font-semibold">
                            {testimonials[currentIndex].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <h3 className="text-xl font-semibold mb-1">{testimonials[currentIndex].name}</h3>
                        <p className="text-muted-foreground mb-3">{testimonials[currentIndex].role}</p>

                        <Badge
                          variant="outline"
                          className={`bg-gradient-to-r ${testimonials[currentIndex].color} text-white border-0`}
                        >
                          {testimonials[currentIndex].mood} Reader
                        </Badge>
                      </motion.div>

                      {/* Quote and content */}
                      <div className="flex-1">
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
                          <blockquote className="text-lg lg:text-xl leading-relaxed mb-6 pl-8">
                            "{testimonials[currentIndex].quote}"
                          </blockquote>
                        </motion.div>

                        {/* Rating */}
                        <motion.div
                          className="flex items-center justify-center lg:justify-start space-x-1 mb-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, rotate: -180 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              transition={{ delay: 0.7 + i * 0.1 }}
                            >
                              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Recommended books */}
                        <motion.div
                          className="flex flex-wrap gap-2 justify-center lg:justify-start"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <span className="text-sm text-muted-foreground mr-2">Discovered books:</span>
                          {testimonials[currentIndex].books.map((book, index) => (
                            <motion.div
                              key={book}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.9 + index * 0.1 }}
                            >
                              <Badge variant="secondary" className="text-xs">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {book}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
                  onClick={nextTestimonial}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-muted-foreground hover:text-primary"
          >
            {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
