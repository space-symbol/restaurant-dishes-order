import { AdminNav } from "@/widgets/admin-nav";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex h-full flex-grow overflow-hidden">
      <aside className="w-64 border-r p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Savory</h1>
          <p className="text-sm text-muted-foreground">Панель управления</p>
        </div>
        <AdminNav />
      </aside>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
} 