import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  console.log("Modal render:", { isOpen, className });
  
  if (!isOpen) {
    console.log("Modal is not open, returning null");
    return null;
  }

  console.log("Modal is open, rendering modal content");

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[300]" 
        onClick={onClose}
        role="presentation"
      />
      <div className={cn(
        "fixed inset-0 z-[301] flex items-center justify-center p-4",
        className
      )}>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Закрыть модалку"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}; 