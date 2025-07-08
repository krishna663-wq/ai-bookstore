import { AnimatedNavbar } from "@/components/animated-navbar"
import { AnimatedHeroSection } from "@/components/animated-hero-section"
import { MoodRecommendations } from "@/components/mood-recommendations"
import { AnimatedFeaturesSection } from "@/components/animated-features-section"
import { FeaturedBooks } from "@/components/featured-books"
import { CategoryShowcase } from "@/components/category-showcase"
import { AnimatedTestimonials } from "@/components/animated-testimonials"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedNavbar />
      <main>
        <AnimatedHeroSection />
        <MoodRecommendations />
        <AnimatedFeaturesSection />
        <FeaturedBooks />
        <CategoryShowcase />
        <AnimatedTestimonials />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
