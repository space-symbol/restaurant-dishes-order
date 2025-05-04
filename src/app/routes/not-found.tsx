import { Link } from "react-router";
import { Route } from "../+types/root";

export const meta = () => {
  return [
    { title: "Savory | Страница не найдена" },
    { name: "description", content: "Страницы не существует." },
  ];
};

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Страница не найдена</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Страницы не существует или она была удалена.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Назад
        </Link>
      </div>
    </main>
  );
} 