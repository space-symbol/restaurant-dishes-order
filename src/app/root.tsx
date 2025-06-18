import { Outlet } from 'react-router'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";
import { Header } from "@/widgets/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Cart } from "@/widgets/cart";
import { useEffect } from "react";
import { initializeAuth } from "@/features/auth/api/manage-users/manage-users";

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <Header />
          <div className="h-full pt-header flex">
             {children}
          </div>
          <Cart />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
