import { Link } from "@/shared/ui/link";
import { Card } from "@/shared/ui/card";

interface DashboardNavigationCardProps {
  title: string;
  description: string;
  to: string;
}

export const DashboardNavigationCard = ({
  title,
  description,
  to,
}: DashboardNavigationCardProps) => {
  return (
    <Link to={to} className="block">
      <Card className="p-6 hover:shadow-lg transition-shadow h-full">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </Card>
    </Link>
  );
}; 