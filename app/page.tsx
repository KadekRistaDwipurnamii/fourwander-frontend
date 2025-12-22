import Hero from "@/components/HeroSearch";
import TopPackages from "@/components/TourPackages";
import WhyChooseUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="space-y-3">
      <Hero />
      <TopPackages />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
