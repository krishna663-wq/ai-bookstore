"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, Heart, User, Menu, BookOpen, Moon, Sun, LogOut, Star } from "lucide-react"
import { useTheme } from "next-themes"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { CursorWrapper } from "@/components/cursor-wrapper"

export function AnimatedNavbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const { setTheme, theme } = useTheme()
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/books", label: "Browse Books", icon: BookOpen },
    { href: "/categories", label: "Categories", icon: Star },
    { href: "/mood-finder", label: "Mood Finder", icon: Heart },
  ]

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  }

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-border/50"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Animated Logo */}
          <motion.div variants={itemVariants} whileHover="hover">
            <CursorWrapper variant="sparkle">
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  className="relative"
                  variants={logoVariants}
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.8, ease: "easeInOut" },
                  }}
                >
                  <BookOpen className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-purple-600" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  whileHover={{
                    backgroundPosition: ["0% 50%", "100% 50%"],
                    transition: { duration: 0.8 },
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  BookMood
                </motion.span>
              </Link>
            </CursorWrapper>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div className="hidden md:flex items-center space-x-6" variants={itemVariants}>
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <CursorWrapper variant="hover">
                    <Link href={item.href} className="relative group">
                      <motion.div
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                          <Icon className="h-4 w-4" />
                        </motion.div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.div>

                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </CursorWrapper>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Animated Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6"
            variants={itemVariants}
          >
            <CursorWrapper variant="text">
              <motion.div
                className="relative flex-1"
                animate={{
                  scale: searchFocused ? 1.02 : 1,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  animate={{
                    rotate: searchFocused ? 360 : 0,
                    scale: searchFocused ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <Input
                  type="search"
                  placeholder="Search books, authors, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`pl-10 transition-all duration-300 ${
                    searchFocused
                      ? "ring-2 ring-primary/50 border-primary/50 shadow-lg"
                      : "border-border hover:border-primary/30"
                  }`}
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {searchQuery.length}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </CursorWrapper>
          </motion.form>

          {/* Right Side Actions */}
          <motion.div className="flex items-center space-x-2" variants={itemVariants}>
            {/* Animated Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CursorWrapper variant="hover">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    whileHover={{ scale: 1.2 }}
                  />
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </CursorWrapper>
            </motion.div>

            {/* Animated Wishlist */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CursorWrapper variant="heart">
                <Button variant="ghost" size="icon" className="relative group overflow-hidden wishlist-button" asChild>
                  <Link href="/wishlist">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Heart className="h-4 w-4 group-hover:fill-pink-500 group-hover:text-pink-500 transition-colors duration-300" />
                    </motion.div>
                  </Link>
                </Button>
              </CursorWrapper>
            </motion.div>

            {/* Animated Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CursorWrapper variant="hover">
                <Button variant="ghost" size="icon" className="relative group overflow-hidden" asChild>
                  <Link href="/cart">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      whileHover={{
                        y: [-2, 2, -2],
                        transition: { duration: 0.4 },
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 group-hover:text-green-500 transition-colors duration-300" />
                    </motion.div>
                    <AnimatePresence>
                      {cartItemCount > 0 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-2 -right-2"
                        >
                          <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-orange-400 to-red-500 border-0">
                            <motion.span
                              key={cartItemCount}
                              initial={{ scale: 1.5 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {cartItemCount}
                            </motion.span>
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </Button>
              </CursorWrapper>
            </motion.div>

            {/* Animated User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CursorWrapper variant="hover">
                      <Button variant="ghost" size="icon" className="relative group overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          whileHover={{ scale: 1.2 }}
                        />
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                          <User className="h-4 w-4 group-hover:text-purple-500 transition-colors duration-300" />
                        </motion.div>
                        {user.role === "admin" && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: 360,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                          </motion.div>
                        )}
                      </Button>
                    </CursorWrapper>
                  </motion.div>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  <DropdownMenuContent align="end" className="w-56">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <CursorWrapper variant="hover">
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                      </CursorWrapper>
                      <CursorWrapper variant="hover">
                        <DropdownMenuItem asChild>
                          <Link href="/orders" className="flex items-center">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Orders
                          </Link>
                        </DropdownMenuItem>
                      </CursorWrapper>
                      {user.role === "admin" && (
                        <CursorWrapper variant="sparkle">
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="flex items-center">
                              <Star className="mr-2 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                        </CursorWrapper>
                      )}
                      <CursorWrapper variant="hover">
                        <DropdownMenuItem onClick={logout} className="text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </CursorWrapper>
                    </motion.div>
                  </DropdownMenuContent>
                </AnimatePresence>
              </DropdownMenu>
            ) : (
              <motion.div className="hidden md:flex space-x-2" variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <CursorWrapper variant="hover">
                    <Button variant="ghost" size="sm" className="relative overflow-hidden group" asChild>
                      <Link href="/login">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        />
                        <span className="relative z-10">Login</span>
                      </Link>
                    </Button>
                  </CursorWrapper>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <CursorWrapper variant="hover">
                    <Button
                      size="sm"
                      className="relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      asChild
                    >
                      <Link href="/register">
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">Sign Up</span>
                      </Link>
                    </Button>
                  </CursorWrapper>
                </motion.div>
              </motion.div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <CursorWrapper variant="hover">
                    <Button variant="ghost" size="icon" className="md:hidden relative group overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <Menu className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </CursorWrapper>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <motion.div
                  className="flex flex-col space-y-4 mt-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, staggerChildren: 0.1 }}
                >
                  <motion.form onSubmit={handleSearch} className="flex space-x-2">
                    <CursorWrapper variant="text">
                      <Input
                        type="search"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </CursorWrapper>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <CursorWrapper variant="hover">
                        <Button type="submit" size="icon" className="bg-gradient-to-r from-primary to-purple-600">
                          <Search className="h-4 w-4" />
                        </Button>
                      </CursorWrapper>
                    </motion.div>
                  </motion.form>

                  <div className="flex flex-col space-y-2">
                    {navItems.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CursorWrapper variant="hover">
                            <Link
                              href={item.href}
                              className="flex items-center space-x-3 text-sm font-medium p-3 hover:bg-accent rounded-md transition-all duration-300 group"
                            >
                              <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.4 }}>
                                <Icon className="h-4 w-4 group-hover:text-primary transition-colors duration-300" />
                              </motion.div>
                              <span>{item.label}</span>
                            </Link>
                          </CursorWrapper>
                        </motion.div>
                      )
                    })}
                  </div>

                  {!user && (
                    <motion.div
                      className="flex flex-col space-y-2 pt-4 border-t"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <CursorWrapper variant="hover">
                          <Button variant="outline" className="w-full bg-transparent" asChild>
                            <Link href="/login">Login</Link>
                          </Button>
                        </CursorWrapper>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <CursorWrapper variant="hover">
                          <Button className="w-full bg-gradient-to-r from-primary to-purple-600" asChild>
                            <Link href="/register">Sign Up</Link>
                          </Button>
                        </CursorWrapper>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>

      {/* Animated progress bar for scroll */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
        style={{
          scaleX: isScrolled ? 1 : 0,
          transformOrigin: "left",
        }}
        animate={{
          scaleX: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  )
}
