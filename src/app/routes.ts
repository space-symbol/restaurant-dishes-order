import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";


export default [
  index("routes/home.tsx"),
  route("/auth", 'routes/auth.tsx'),
  layout("./layouts/private-layout.tsx", [
    ...prefix("/orders", [
      route("/", 'routes/orders/index.tsx'),
      route("/new", 'routes/orders/new.tsx'),
    ]),
  ]),
  layout("./layouts/admin-layout.tsx", [
    ...prefix("/dashboard", [
      route("/", 'routes/dashboard/index.tsx'),
      route("/orders", 'routes/dashboard/orders.tsx'),
      route("/menu", 'routes/dashboard/menu.tsx'),
      route("/reviews", 'routes/dashboard/reviews.tsx'),
      // route("/statistics", 'routes/dashboard/statistics.tsx'),
    ]),
  ]),
  route("/menu/:id", "routes/menu/[id].tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
