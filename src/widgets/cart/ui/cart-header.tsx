import { X } from "lucide-react";

interface CartHeaderProps {
  onClose?: () => void;
}

export const CartHeader = ({ onClose }: CartHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Корзина</h2>
    {onClose && (
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Закрыть корзину"
      >
        <X size={24} />
      </button>
    )}
  </div>
); 