import { NavigateOptions, useNavigate } from "react-router";
import { routesConfig, RoutesPaths } from "@/shared/config/routes";


export const useAppNavigate = () => {
  const navigate = useNavigate();

  return <T extends RoutesPaths>(path: T, params?: NavigateOptions) => {
    navigate(path, params);
  }
}