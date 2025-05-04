import cn from "@/shared/lib/cn";
import { useIntersectionObserver } from "@/shared/hooks/use-intersection-observer";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DishCard, type Dish } from "@/entities/dish";
import { CartItem, useCartStore } from "@/entities/cart";
import { mockMenuItems } from "@/shared/mocks/dishes";

const ITEMS_PER_PAGE = 3;

export const FeaturedDishes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { ref: sectionRef, isVisible: isSectionVisible } = useIntersectionObserver();
  const { addItem } = useCartStore();

  const handleAddToCart = (dish: Dish) => {
    const cartItem: CartItem = {
      id: dish.id.toString(),
      name: dish.name,
      price: dish.price,
      quantity: 1,
      restaurantId: "1"
    };
    
    addItem(cartItem);
  };

  // Преобразуем MenuItem в Dish
  const dishes: Dish[] = mockMenuItems.map(item => ({
    id: parseInt(item.id),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.imageUrl,
    category: item.category.toLowerCase() as "starters" | "mains" | "desserts",
    featured: item.featured,
    new: item.new,
    rating: item.averageRating
  }));

  const featuredDishes = dishes.filter(dish => dish.featured);
  const totalPages = Math.ceil(featuredDishes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDishes = featuredDishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="menu" className="section-padding bg-restaurant-peach/20" ref={sectionRef}>
      <div className="container-custom">
        <div className={cn(
          "text-center mb-12 opacity-0",
          isSectionVisible && "animate-fade-in"
        )} style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши Фирменные Блюда</h2>
          <div className="w-20 h-1 bg-restaurant-red mx-auto mb-6"></div>
          <p className="text-restaurant-gray max-w-3xl mx-auto">
            Откройте для себя избранные блюда нашего шеф-повара, приготовленные из лучших сезонных ингредиентов.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {paginatedDishes.map((dish, index) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onAddToCart={handleAddToCart}
              animationDelay={`${0.6 + index * 0.1}s`}
              isVisible={isSectionVisible}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className={cn(
            "flex justify-center gap-2 opacity-0",
            isSectionVisible && "animate-fade-in"
          )} style={{ animationDelay: "0.8s" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                  currentPage === page
                    ? "bg-restaurant-red text-white"
                    : "bg-white text-restaurant-dark hover:bg-restaurant-red/10"
                )}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};