import { useAuthStore } from "@/entities/auth";
import { Button } from "@/shared/ui/button";
import { LogOut, User, Crown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface UserInfoProps {
  className?: string;
  showLogout?: boolean;
}

export const UserInfo = ({ className, showLogout = true }: UserInfoProps) => {
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        {user.role === 'ADMIN' ? (
          <Crown className="w-4 h-4 text-yellow-600" />
        ) : (
          <User className="w-4 h-4 text-gray-600" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {user.email}
          </span>
          <span className="text-xs text-gray-500">
            {user.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
          </span>
        </div>
      </div>
      
      {showLogout && (
        <Button 
          onClick={logout} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <LogOut className="w-3 h-3" />
          Выйти
        </Button>
      )}
    </div>
  );
}; 