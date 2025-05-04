import cn from "@/shared/lib/cn";

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader = ({ className, size = 'md' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-restaurant-red/20",
          "border-t-restaurant-red",
          sizeClasses[size]
        )}
      />
    </div>
  );
}; 