import type { LoaderFunctionArgs } from "react-router";
import { Order } from "@/entities/order";

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs;
  export type ClientLoaderArgs = {
    serverLoader: () => Promise<LoaderData>;
    request: Request;
  };
  export type LoaderData = {
    orders: Order[];
    total: number;
  };
  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 