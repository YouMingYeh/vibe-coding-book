import ContentSection from "@/components/landing/content";
import HeroSection from "@/components/landing/hero-section";

export default function Page() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ContentSection/>
    </div>
  )
}
