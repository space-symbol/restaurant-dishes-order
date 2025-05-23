import type { LoaderFunctionArgs } from "react-router-dom";
import { MenuItemWithRating } from "@/entities/menu/model/types/types";

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs;
  export type ClientLoaderArgs = {
    serverLoader: () => Promise<LoaderData>;
    request: Request;
  };
  export type LoaderData = {
    items: MenuItemWithRating[];
  };
  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 