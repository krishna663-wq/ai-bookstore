"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Heart, Gift, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shipping = cartTotal > 50 ? 0 : 5.99
  const tax = cartTotal * 0.08
  const finalTotal = cartTotal + shipping + tax - discount

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "booklover") {
      setDiscount(cartTotal * 0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "newreader") {
      setDiscount(5) // $5 off
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any books to your cart yet. Discover amazing books that match your mood!
            </p>
            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/mood-finder">
                  <Heart className="mr-2 h-4 w-4" />
                  Find Books by Mood
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/books">Browse All Books</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Button variant="outline" onClick={clearCart}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.cover || "/placeholder.svg"}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground">{item.author}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">${item.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center">
                      Shipping
                      {shipping === 0 && (
                        <Badge variant="secondary" className="ml-2">
                          Free
                        </Badge>
                      )}
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                      <Truck className="inline h-4 w-4 mr-1" />
                      Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="mr-2 h-4 w-4" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode}>Apply</Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Try: BOOKLOVER or NEWREADER</div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Continue Shopping */}
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/books">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
