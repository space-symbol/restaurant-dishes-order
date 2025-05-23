import type { LoaderFunctionArgs } from "react-router";
import { MenuItemWithRating } from "@/entities/menu";

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs;
  export type ClientLoaderArgs = {
    serverLoader: () => Promise<LoaderData>;
    request: Request;
  };
  export type LoaderData = {
    featuredDishes: {
      items: MenuItemWithRating[];
      total: number;
    };
  };
  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 