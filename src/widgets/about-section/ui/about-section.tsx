import { Award, Users, Utensils } from "lucide-react";
import { useIntersectionObserver } from "@/shared/hooks/use-intersection-observer";
import cn from "@/shared/lib/cn";

const features = [
  {
    icon: <Utensils className="h-6 w-6 text-restaurant-red" />,
    title: "Свежие Ингредиенты",
    description: "Мы используем только свежие сезонные продукты от местных фермеров и производителей."
  },
  {
    icon: <Award className="h-6 w-6 text-restaurant-red" />,
    title: "Награды",
    description: "Наш ресторан неоднократно получал награды за кулинарное мастерство."
  },
  {
    icon: <Users className="h-6 w-6 text-restaurant-red" />,
    title: "Профессиональная Команда",
    description: "Наши повара имеют многолетний опыт работы в сфере изысканной кухни."
  }
];

export const AboutSection = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useIntersectionObserver({
    rootMargin: '100px',
    threshold: 0.2
  });

  return (
    <section id="about" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        <div className={cn(
          "text-center mb-12 opacity-0",
          isSectionVisible && "animate-fade-in"
        )} style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша История</h2>
          <div className="w-20 h-1 bg-restaurant-red mx-auto mb-6"></div>
          <p className="text-restaurant-gray max-w-3xl mx-auto">
            Основанный в 2010 году, Savory уже более десяти лет радует гостей изысканной кухней и незабываемыми гастрономическими впечатлениями.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "relative opacity-0",
            isSectionVisible && "animate-bounce-in"
          )} style={{ animationDelay: "0.4s" }}>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Шеф-повар готовит блюдо"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-restaurant-red text-white p-6 rounded-lg shadow-lg hidden md:block animate-float">
              <p className="text-4xl font-serif font-bold">12+</p>
              <p className="text-sm uppercase tracking-wider">Лет Опыта</p>
            </div>
          </div>

          <div className={cn(
            "opacity-0",
            isSectionVisible && "animate-fade-in"
          )} style={{ animationDelay: "0.6s" }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">Страсть к Кулинарному Совершенству</h3>
            <p className="text-restaurant-gray mb-6">
              В Savory наша философия проста: исключительные ингредиенты, приготовленные с заботой и креативностью, подаются в теплой и гостеприимной атмосфере.
            </p>
            <p className="text-restaurant-gray mb-8">
              Наш шеф-повар, Изабелла Мартинес, привносит свой международный опыт и любовь к местным вкусам в создание меню, которое празднует как традиции, так и инновации. Каждое блюдо создается не просто как еда, а как впечатление, которое запомнится надолго.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.slice(0, 2).map((feature, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-start gap-3 opacity-0",
                    isSectionVisible && "animate-fade-in"
                  )} 
                  style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                >
                  <div className="mt-1 p-2 rounded-full bg-restaurant-peach/50 animate-pulse">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-restaurant-dark mb-1">{feature.title}</h4>
                    <p className="text-sm text-restaurant-gray">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}