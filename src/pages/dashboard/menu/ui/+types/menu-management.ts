import type { LoaderFunctionArgs } from "react-router-dom";
import { MenuItem } from "@/entities/menu";

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs;
  export type ClientLoaderArgs = {
    serverLoader: () => Promise<LoaderData>;
    request: Request;
  };
  export type LoaderData = {
    items: MenuItem[];
  };
  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 