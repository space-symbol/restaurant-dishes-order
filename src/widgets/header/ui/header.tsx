import { CartSwitcher } from "@/features/cart";
import cn from "@/shared/lib/cn";
import { Link } from "@/shared/ui/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/entities/auth";
import { Button } from "@/shared/ui/button";
import { routesConfig } from "@/shared/config/routes";

interface HeaderProps {
  className?: string;
}

type NavLink = {
  name: string;
  href: string;
  isPrivate?: boolean;
  accent?: boolean;
}

const navLinks: NavLink[] = [
  { name: "Главная", href: routesConfig.home.hero.path },
  { name: "О нас", href: routesConfig.home.about.path },
  { name: "Меню", href: routesConfig.home.menuList.path, accent: true },
  { name: "Контакты", href: routesConfig.home.contact.path },
  { name: "Мои заказы", href: routesConfig.home.orders.path, isPrivate: true },
] as const;

export const Header = ({className}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <header
      className={cn(
        "bg-header shadow-sm relative",
        className
      )}
    >
      <div className="container-custom flex h-header justify-between items-center">
        <Link to={routesConfig.home.path} className="font-serif text-2xl font-bold text-restaurant-dark">
          Savory
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            if (link.isPrivate && !isAuthenticated) {
              return null;
            }

            return (
              <Link 
                key={link.name}
                variant="underline"
                to={link.href}
              >
                {link.name}
              </Link>
            );
          })}
          {isAdmin && (
            <Link 
              to={routesConfig.home.dashboard.path}
              variant="underline"
            >
              Панель управления
            </Link>
          )}
          {isAuthenticated ? (
            <Button onClick={logout} variant="outline">
              Выйти
            </Button>
          ) : (
            <Link to={routesConfig.home.auth.path} variant="button">
              Войти
            </Link>
          )}
          <CartSwitcher />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <CartSwitcher />
          <Button 
            size="icon"
            variant="ghost" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden z-50 bg-header border-t absolute top-full left-0 right-0 py-3 sm:py-4 shadow-lg animate-fade-in">
          <div className="container-custom flex flex-col space-y-3 sm:space-y-4">
            {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href} 
                  className={cn(
                    "text-sm sm:text-base text-restaurant-dark font-medium py-1.5 sm:py-2",
                    link.accent && "!text-restaurant-red"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
            ))}
            {isAdmin && (
              <Link 
                to={routesConfig.home.dashboard.path}
                className="text-sm sm:text-base text-restaurant-dark font-medium py-1.5 sm:py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Панель управления
              </Link>
            )}
            {isAuthenticated ? (
              <Button 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} 
                variant="outline" 
                className="w-full text-sm sm:text-base"
              >
                Выйти
              </Button>
            ) : (
              <Link 
                variant="button"
                to={routesConfig.home.auth.path}
                className="text-center text-sm sm:text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Войти
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};