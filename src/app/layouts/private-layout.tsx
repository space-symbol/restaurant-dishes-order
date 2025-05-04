import { useAuthStore } from "@/entities/auth";
import { routesConfig } from "@/shared/config/routes";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const { isAuthenticated } = useAuthStore();
  const isClient = typeof window !== 'undefined';

  if (!isAuthenticated && isClient) {
    return <Navigate to={routesConfig.home.path} />;
  }

  return <Outlet />;
} 