import { Route } from "../+types/root";
import { AboutSection } from "@/widgets/about-section";
import { FeaturedDishes } from "@/widgets/featured-dishes";
import { Footer } from "@/widgets/footer";
import { Hero } from "@/widgets/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Savory" },
    { name: "description", content: "Ресторанный Аггрегатор" },
  ];
}

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <FeaturedDishes />
      <Footer />
    </main>
  );
}

