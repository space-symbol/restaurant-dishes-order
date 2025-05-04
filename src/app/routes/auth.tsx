import type { Route } from "../+types/root";
import { Link } from "src/shared/ui/link";
import { AuthForm } from "src/features/auth";
import { Navigate, useSearchParams } from "react-router";
import { useAuthStore } from "@/entities/auth";
import { useAppNavigate } from "@/shared/hooks/use-navigate";
import { useEffect, useLayoutEffect } from "react";
import { routesConfig } from "@/shared/config/routes";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Авторизация" },
    { name: "description", content: "Авторизация" },
  ];
};

export default function Auth() {
  const [params] = useSearchParams();
  const isRegister = !!params.get("register");
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const navigate = useAppNavigate()

  useLayoutEffect(() => {
    if (isAuth) {
      navigate(routesConfig.home.path)
    }
  }, [isAuth, navigate]);
  
  return <main className="flex overflow-hidden flex-grow">
    <div className="m-auto flex flex-col items-center gap-4 p-4 rounded min-w-62 w-128 animate-fade-in">
      <div>
      {
        isRegister ? <>
          <h1 className="text-center">Добро пожаловать!</h1>
          <p className="text-secondary-foreground text-center">С нами всё просто и быстро</p>
        </>
        : 
        <>
          <h1 className="text-center">С возвращением!</h1>
          <p className="text-secondary-foreground text-center">Заказывай свои любимые блюда без очередей</p>
        </> 

      }
      </div>
 
      <div className="flex flex-col gap-6 w-full bg-white p-8 rounded">
        <AuthForm isRegister={isRegister} className="contents w-full" />
        <Link variant={'primary'} className="text-center" to={isRegister ? "/auth" : "/auth?register=true"}>
          {isRegister ? "Есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
        </Link>
      </div>
    </div>
  </main>
}