import { cn } from "@/shared/lib/utils";
import { useIntersectionObserver } from "@/shared/hooks/use-intersection-observer";
import { DishesList } from "@/features/menu-aggregate";
import type { Route } from "@/app/routes/home/+types/home";

interface FeaturedDishesProps {
  initialData?: Route.LoaderData['featuredDishes'];
}

export const FeaturedDishes = ({ initialData }: FeaturedDishesProps) => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.5,
  });

  return (
    <section id="menu" className="section-padding bg-restaurant-peach/20" ref={sectionRef}>
      <div className="container-custom">
        <div className={cn(
          "text-center mb-8 sm:mb-12 opacity-0",
          isSectionVisible && "animate-fade-in"
        )} style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Наши Фирменные Блюда</h2>
          <div className="w-16 sm:w-20 h-1 bg-restaurant-red mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base text-restaurant-gray max-w-3xl mx-auto">
            Откройте для себя избранные блюда нашего шеф-повара, приготовленные из лучших сезонных ингредиентов.
          </p>
        </div>

        <DishesList isVisible={isSectionVisible} initialData={initialData} />
      </div>
    </section>
  );
};