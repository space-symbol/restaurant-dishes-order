import { Modal } from "@/shared/ui/modal";
import { QRCode } from "@/shared/ui/qr-code";
import { Button } from "@/shared/ui/button";
import { formatCurrency } from "@/shared/lib/currency";
import { Copy, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
}

export const PaymentModal = ({ isOpen, onClose, amount, orderId }: PaymentModalProps) => {
  console.log("PaymentModal render:", { isOpen, amount, orderId });
  console.log("PaymentModal amount check:", { amount, amountType: typeof amount, amountCheck: amount > 0 });
  
  // Проверяем валидность данных
  const isValidData = isOpen && amount > 0 && orderId && orderId !== 'undefined';
  
  console.log("PaymentModal isValidData:", isValidData, {
    isOpen,
    amount,
    orderId,
    amountCheck: amount > 0,
    orderIdCheck: orderId && orderId !== 'undefined'
  });
  
  if (!isValidData) {
    console.log("PaymentModal: Invalid data, not rendering", { isOpen, amount, orderId });
    return null;
  }
  
  console.log("PaymentModal: About to render modal content");
  
  // Генерируем случайный QR код для СБП
  const generateSBPQRCode = () => {
    // Формат QR кода для СБП (упрощенный пример)
    const sbpData = {
      type: "SBP",
      amount: amount,
      orderId: orderId,
      timestamp: Date.now(),
      random: Math.random().toString(36).substring(7)
    };
    
    const qrValue = JSON.stringify(sbpData);
    console.log("Generated QR code value:", qrValue);
    return qrValue;
  };

  const qrValue = generateSBPQRCode();

  const handleCopyQR = async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      toast.success("QR код скопирован в буфер обмена");
    } catch (error) {
      toast.error("Не удалось скопировать QR код");
    }
  };

  console.log("PaymentModal: Rendering modal content");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-green-600 mr-2" />
            <h2 className="text-2xl font-bold">Оплата по СБП</h2>
          </div>
          <p className="text-gray-600 mb-2">
            Отсканируйте QR код в приложении вашего банка
          </p>
          <p className="text-lg font-semibold text-green-600">
            Сумма к оплате: {formatCurrency(amount)}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <QRCode value={qrValue} size={200} />
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleCopyQR}
            variant="outline" 
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Скопировать QR код
          </Button>
          
          <Button 
            onClick={onClose}
            className="w-full"
          >
            Закрыть
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            После оплаты ваш заказ будет автоматически подтвержден
          </p>
        </div>
      </div>
    </Modal>
  );
}; 