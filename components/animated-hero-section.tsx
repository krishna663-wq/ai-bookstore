"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, BookOpen, Heart, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { EnhancedButton } from "@/components/enhanced-button"

export function AnimatedHeroSection() {
  const [mood, setMood] = useState("")
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  const controls = useAnimation()

  const popularMoods = [
    { name: "Happy", emoji: "😊", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { name: "Adventurous", emoji: "🗺️", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { name: "Romantic", emoji: "💕", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
    { name: "Mysterious", emoji: "🔍", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    { name: "Thoughtful", emoji: "🤔", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  ]

  const featuredBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      mood: "Thoughtful",
      color: "from-blue-400 to-purple-600",
      rating: 4.7,
    },
    {
      title: "Beach Read",
      author: "Emily Henry",
      mood: "Happy",
      color: "from-yellow-400 to-orange-500",
      rating: 4.6,
    },
    {
      title: "The Seven Husbands",
      author: "Taylor Jenkins Reid",
      mood: "Romantic",
      color: "from-pink-400 to-red-500",
      rating: 4.9,
    },
    {
      title: "Gone Girl",
      author: "Gillian Flynn",
      mood: "Mysterious",
      color: "from-gray-600 to-gray-800",
      rating: 4.6,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prev) => (prev + 1) % featuredBooks.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    controls.start("visible")
  }, [controls])

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-50/50 to-pink-50/30 dark:from-primary/10 dark:via-purple-950/20 dark:to-pink-950/10 min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Badge variant="secondary" className="w-fit">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="mr-2 h-3 w-3" />
                  </motion.div>
                  AI-Powered Recommendations
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight"
                variants={itemVariants}
              >
                Find Books That Match Your{" "}
                <motion.span
                  className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Mood
                </motion.span>
              </motion.h1>

              <motion.p className="text-xl text-muted-foreground max-w-lg leading-relaxed" variants={itemVariants}>
                Discover your next favorite read with our AI-powered mood-based recommendations. Tell us how you're
                feeling, and we'll find the perfect book for you.
              </motion.p>
            </motion.div>

            {/* Mood Input */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                className="flex space-x-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Input
                  placeholder="How are you feeling today?"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="flex-1 h-14 text-lg border-2 focus:border-primary transition-all duration-300"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <EnhancedButton
                    size="lg"
                    colorScheme="rainbow"
                    glowEffect={true}
                    className="h-14 px-8 text-lg shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <Link href={`/mood-finder${mood ? `?mood=${encodeURIComponent(mood)}` : ""}`}>
                      Find Books
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </EnhancedButton>
                </motion.div>
              </motion.div>

              <div className="flex flex-wrap gap-2 items-center">
                <motion.span className="text-sm text-muted-foreground" variants={itemVariants}>
                  Popular moods:
                </motion.span>
                {popularMoods.map((moodItem, index) => (
                  <motion.div
                    key={moodItem.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="secondary"
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${moodItem.color} relative overflow-hidden group`}
                      onClick={() => setMood(moodItem.name)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{moodItem.emoji}</span>
                      <span className="ml-1 relative z-10">{moodItem.name}</span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div className="grid grid-cols-3 gap-6 pt-8" variants={itemVariants}>
              {[
                { icon: BookOpen, value: "10K+", label: "Books Available", color: "text-primary" },
                { icon: Heart, value: "50K+", label: "Happy Readers", color: "text-pink-500" },
                { icon: TrendingUp, value: "95%", label: "Match Rate", color: "text-green-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`flex items-center justify-center w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full mb-3 mx-auto shadow-lg border`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.2, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Animated Book Showcase */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="grid grid-cols-2 gap-4"
              animate={{ rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={index}
                  className={`relative h-64 rounded-xl bg-gradient-to-br ${book.color} p-6 text-white shadow-2xl overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                  animate={{
                    opacity: 1,
                    scale: currentBookIndex === index ? 1.05 : 1,
                    rotateX: 0,
                    y: currentBookIndex === index ? -10 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Animated background elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  />

                  <div className="absolute top-4 right-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + index * 0.1 }}>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        {book.mood}
                      </Badge>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.h3
                      className="font-bold text-lg mb-1 line-clamp-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      {book.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm opacity-90 mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                    >
                      {book.author}
                    </motion.p>
                    <motion.div
                      className="flex items-center space-x-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 1.5 + index * 0.1 + i * 0.05 }}
                        >
                          <Star
                            className={`h-4 w-4 ${i < Math.floor(book.rating) ? "fill-yellow-300 text-yellow-300" : "text-white/50"}`}
                          />
                        </motion.div>
                      ))}
                      <span className="text-sm ml-2">{book.rating}</span>
                    </motion.div>
                  </div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
              variants={floatingVariants}
              animate="animate"
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowRight className="h-4 w-4 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
