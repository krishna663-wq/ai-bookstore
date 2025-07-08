"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, Sparkles, BookOpen, Users, TrendingUp, Shield, Star, Search, Smartphone } from "lucide-react"

export function AnimatedFeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Our advanced AI analyzes your mood and preferences to suggest the perfect books for any moment.",
      color: "from-blue-500 to-purple-600",
      iconColor: "text-blue-500",
      badge: "Smart AI",
    },
    {
      icon: Heart,
      title: "Mood-Based Discovery",
      description: "Tell us how you're feeling, and we'll match you with books that complement your emotional state.",
      color: "from-pink-500 to-red-500",
      iconColor: "text-pink-500",
      badge: "Emotional",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find books by title, author, genre, mood, or any combination with our intelligent search system.",
      color: "from-green-500 to-emerald-600",
      iconColor: "text-green-500",
      badge: "Powerful",
    },
    {
      icon: Users,
      title: "Community Reviews",
      description: "Read authentic reviews from fellow readers and share your own book experiences.",
      color: "from-orange-500 to-yellow-500",
      iconColor: "text-orange-500",
      badge: "Social",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Enjoy a seamless reading discovery experience across all your devices, anywhere, anytime.",
      color: "from-purple-500 to-indigo-600",
      iconColor: "text-purple-500",
      badge: "Responsive",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your reading preferences and personal data are protected with enterprise-grade security.",
      color: "from-gray-600 to-gray-800",
      iconColor: "text-gray-600",
      badge: "Protected",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-2 h-3 w-3" />
              Why Choose BookMood
            </Badge>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover Books Like Never Before
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of book discovery with our AI-powered platform that understands your emotions and
            connects you with stories that resonate with your soul.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 },
                }}
                key={index}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm relative overflow-hidden">
                  {/* Enhanced animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.6 },
                    }}
                  />

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `linear-gradient(45deg, ${feature.color.split(" ")[1]}, ${feature.color.split(" ")[3]})`,
                      padding: "2px",
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full bg-background rounded-lg" />
                  </motion.div>

                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="flex-shrink-0"
                        variants={iconVariants}
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                          transition: { duration: 0.6 },
                        }}
                      >
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
                          whileHover={{
                            boxShadow: `0 20px 40px ${
                              feature.color.includes("blue")
                                ? "rgba(59, 130, 246, 0.4)"
                                : feature.color.includes("pink")
                                  ? "rgba(236, 72, 153, 0.4)"
                                  : feature.color.includes("green")
                                    ? "rgba(34, 197, 94, 0.4)"
                                    : feature.color.includes("orange")
                                      ? "rgba(249, 115, 22, 0.4)"
                                      : feature.color.includes("purple")
                                        ? "rgba(147, 51, 234, 0.4)"
                                        : "rgba(107, 114, 128, 0.4)"
                            }`,
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%", skewX: -15 }}
                            whileHover={{
                              x: "100%",
                              transition: { duration: 0.8 },
                            }}
                          />
                          <Icon className="w-8 h-8 text-white relative z-10" />
                        </motion.div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <motion.h3
                            className="text-xl font-semibold group-hover:text-primary transition-colors duration-300"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            {feature.title}
                          </motion.h3>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {feature.badge}
                            </Badge>
                          </motion.div>
                        </div>

                        <motion.p
                          className="text-muted-foreground leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                    </div>

                    {/* Hover effect elements */}
                    <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: BookOpen, value: "10,000+", label: "Books Available", color: "text-blue-500" },
            { icon: Users, value: "50,000+", label: "Happy Readers", color: "text-green-500" },
            { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-500" },
            { icon: TrendingUp, value: "95%", label: "Match Accuracy", color: "text-purple-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </motion.div>
              <motion.div
                className="text-3xl font-bold mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
