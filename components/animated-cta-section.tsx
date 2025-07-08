"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, BookOpen, Heart, Mail, Gift, Star, Zap } from "lucide-react"
import Link from "next/link"
import { EnhancedButton } from "@/components/enhanced-button"

export function AnimatedCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-50/50 to-pink-50/30 dark:from-primary/10 dark:via-purple-950/20 dark:to-pink-950/10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-20 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-500/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate={controls}>
          {/* Main CTA Card */}
          <motion.div variants={itemVariants}>
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl">
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-20"
                animate={{
                  background: [
                    "linear-gradient(0deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.2), rgba(119, 198, 255, 0.2))",
                    "linear-gradient(120deg, rgba(255, 119, 198, 0.2), rgba(119, 198, 255, 0.2), rgba(120, 119, 198, 0.2))",
                    "linear-gradient(240deg, rgba(119, 198, 255, 0.2), rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.2))",
                    "linear-gradient(360deg, rgba(120, 119, 198, 0.2), rgba(255, 119, 198, 0.2), rgba(119, 198, 255, 0.2))",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <CardContent className="p-12 relative z-10">
                <div className="text-center space-y-8">
                  {/* Badge */}
                  <motion.div variants={itemVariants} className="flex justify-center">
                    <Badge variant="secondary" className="px-4 py-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                      </motion.div>
                      Start Your Journey Today
                    </Badge>
                  </motion.div>

                  {/* Heading */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                      Ready to Find Your
                      <motion.span
                        className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      >
                        Perfect Book?
                      </motion.span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Join thousands of readers who've discovered their next favorite story through our AI-powered mood
                      recommendations.
                    </p>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <EnhancedButton
                        size="lg"
                        colorScheme="rainbow"
                        glowEffect={true}
                        className="h-14 px-8 text-lg shadow-lg hover:shadow-xl"
                        asChild
                      >
                        <Link href="/mood-finder">
                          <Heart className="mr-2 h-5 w-5" />
                          Find Books by Mood
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </EnhancedButton>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <EnhancedButton
                        variant="outline"
                        size="lg"
                        colorScheme="info"
                        className="h-14 px-8 text-lg border-2 hover:bg-primary/5 transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <Link href="/books">
                          <BookOpen className="mr-2 h-5 w-5" />
                          Browse All Books
                        </Link>
                      </EnhancedButton>
                    </motion.div>
                  </motion.div>

                  {/* Features highlight */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {[
                      { icon: Zap, title: "Instant Recommendations", desc: "Get personalized suggestions in seconds" },
                      { icon: Star, title: "95% Match Rate", desc: "Highly accurate mood-based matching" },
                      { icon: Gift, title: "Always Free", desc: "No subscription fees, ever" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 rounded-lg bg-muted/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <motion.div
                          className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <feature.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsletter signup */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-muted/30 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Stay Updated</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Get the latest book recommendations and mood-based reading tips delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input placeholder="Enter your email" type="email" className="flex-1" />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <EnhancedButton className="w-full sm:w-auto" colorScheme="success" glowEffect={true}>
                        Subscribe
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </EnhancedButton>
                    </motion.div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No spam, unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
