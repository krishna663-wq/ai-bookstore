"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { BookOpen, Users, ShoppingCart, TrendingUp, Package, AlertTriangle, Heart } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { redirect } from "next/navigation"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    lowStockBooks: 0,
    pendingOrders: 0,
  })

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      redirect("/")
    }
  }, [user])

  useEffect(() => {
    // Mock data loading
    setStats({
      totalBooks: 10247,
      totalUsers: 15632,
      totalOrders: 3421,
      revenue: 125430,
      lowStockBooks: 23,
      pendingOrders: 156,
    })
  }, [])

  const salesData = [
    { month: "Jan", sales: 12000, orders: 340 },
    { month: "Feb", sales: 15000, orders: 420 },
    { month: "Mar", sales: 18000, orders: 510 },
    { month: "Apr", sales: 22000, orders: 630 },
    { month: "May", sales: 25000, orders: 720 },
    { month: "Jun", sales: 28000, orders: 810 },
  ]

  const categoryData = [
    { name: "Romance", value: 30, color: "#ff6b9d" },
    { name: "Fantasy", value: 25, color: "#a855f7" },
    { name: "Mystery", value: 20, color: "#6366f1" },
    { name: "Non-Fiction", value: 15, color: "#10b981" },
    { name: "Sci-Fi", value: 10, color: "#f59e0b" },
  ]

  const moodTrends = [
    { mood: "Happy", count: 1250, trend: "+12%" },
    { mood: "Romantic", count: 980, trend: "+8%" },
    { mood: "Adventurous", count: 750, trend: "+15%" },
    { mood: "Mysterious", count: 650, trend: "+5%" },
    { mood: "Thoughtful", count: 520, trend: "+3%" },
  ]

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here's what's happening with your bookstore.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Books</p>
                  <p className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-200">Low Stock Alert</p>
                  <p className="text-sm text-orange-600 dark:text-orange-300">
                    {stats.lowStockBooks} books are running low on inventory
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Pending Orders</p>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {stats.pendingOrders} orders awaiting processing
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Mood Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Mood-Based Recommendation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodTrends.map((mood) => (
                    <div key={mood.mood} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="font-medium">{mood.mood}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{mood.count} recommendations</span>
                        <Badge variant="secondary" className="text-green-600">
                          {mood.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="books">
            <Card>
              <CardHeader>
                <CardTitle>Book Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Book inventory management interface would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order processing and tracking interface would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User account management interface would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
