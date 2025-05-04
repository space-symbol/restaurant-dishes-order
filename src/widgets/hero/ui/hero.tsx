import { Link } from "@/shared/ui/link"
import { ChefHat, Package } from "lucide-react"

export const Hero = () => {
  return (
 <section 
      id="hero" 
      className="relative min-h-[calc(100vh-var(--height-header))] flex items-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 bg-restaurant-red/90 px-4 py-2 rounded-full mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Package size={16} />
            <span className="text-sm font-medium">Закажите онлайн с самовывозом</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-md opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Вкусная Еда,<br />Готовая к Вашему Приходу
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-shadow-sm opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Не ждите! Закажите любимые блюда онлайн и заберите их в удобное для вас время. Свежие, горячие и готовые к подаче.
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <a href="#menu" className="btn-primary inline-flex items-center gap-2">
              <Package size={18} />
              Заказать с самовывозом
            </a>
            <Link to="#menu" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 py-3 px-6 rounded-md font-medium transition-all duration-200 inline-flex items-center gap-2">
              <ChefHat size={18} />
              Посмотреть Меню
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#menu" className="text-white/80 hover:text-white transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  )
}