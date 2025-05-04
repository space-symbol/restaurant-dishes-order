import routes from "~/routes";

type BaseRoute = {
  name: string;
  path: string;
  children?: readonly BaseRoute[];
}

type ReadonlyDeep<T extends object | any[]> = {
  readonly [Key in keyof T]: 
    T[Key] extends any[] ? ReadonlyArray<ReadonlyDeep<T[Key]>> 
    : T[Key] extends object ? ReadonlyDeep<T[Key]> 
    : T[Key];
};


const baseRoutes = [{
    name: "home",
    path: "/",
    children: [
      {
        name: "hero",
        path: "/#hero",
      },
      {
        name: "about",
        path: "/#about",
      },
      {
        name: "menu",
        path: "/#menu",
      },
      {
        name: "contact",
        path: "/#contact",
      },
      {
        name: "auth",
        path: "/auth",
        children: [
          {
            name: "register",
            path: "?register=true",
          }
        ]
      },
      {
        name: "orders",
        path: "/orders",
        children: [
          {
            name: "new",
            path: "/new",
          }
        ]
      },
      {
        name: "dashboard",
        path: "/dashboard",
        children: [
          {
            name: "orders",
            path: "/orders",
          }
        ]
      },
    ],
}] as const satisfies ReadonlyDeep<BaseRoute[]>;

export type ConcatPath<ParentPath extends string | number, ChildPath extends string | number, > = ChildPath extends '/' ? ChildPath : ParentPath extends '/' ? ChildPath extends `/${string}` ? ChildPath : `${ParentPath}${ChildPath}` : `${ParentPath}/${ChildPath}`;

export function concatPaths<Parent extends string, Child extends string>(
  parentPath: Parent,
  childPath: Child
): ConcatPath<Parent, Child> {
   const parentPathString = parentPath ? parentPath.toString() : "";
  const childPathString = childPath ? childPath.toString() : "";
  const sanitizedParentPath = parentPathString.replace(/\/+$/, "");
  const sanitizedChildPath = childPathString.replace(/^\/+/, "");

  if (sanitizedChildPath.startsWith("?")) {
    return `${sanitizedParentPath}${sanitizedChildPath}` as ConcatPath<Parent, Child>;
  }
  
  return `${sanitizedParentPath}/${sanitizedChildPath}` as ConcatPath<Parent, Child>;
}


type RecursiveTransformed<Route extends BaseRoute, ParentPath extends string = ""> = {
  [K in Route["name"]]: {
    path: ConcatPath<ParentPath, Route["path"]>;
  } & (Route extends { children: infer Children }
    ? Children extends readonly BaseRoute[]
      ? {
          [Child in Children[number] as Child["name"]]: RecursiveTransformed<
            Child,
            ConcatPath<ParentPath, Route["path"]>
          >
        }
      : {}
    : {});
}[Route["name"]];

const transformRoutes = <T extends readonly BaseRoute[]>(
  routes: T,
  parentPath: string = ""
): {
  [K in T[number]["name"]]: RecursiveTransformed<
    typeof baseRoutes[0], 
    typeof parentPath
  >
} => {
  return routes.reduce((acc, route) => {
    const { name, path, children } = route;
    const combinedPath = concatPaths(parentPath, path);

    const current = {
      path: combinedPath,
      ...(children ? transformRoutes(children, combinedPath) : {})
    };

    return { ...acc, [name]: current };
  }, {} as any);
};

export const routesConfig = transformRoutes(baseRoutes)


export type ExtractRoutesPaths<T> = {
  [K in keyof T]: T[K] extends { path: string } ? T[K]['path'] | (T[K] extends {
    path: string
    [key: string]: unknown
  } ? ExtractRoutesPaths<Omit<T[K], 'path'>> : never) : never;
}[keyof T]


export type RoutesPaths = ExtractRoutesPaths<typeof routesConfig>