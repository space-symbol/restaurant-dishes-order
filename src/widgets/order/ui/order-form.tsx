import { useState, useEffect, useCallback, useReducer } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { OrderPickupOptions, AdditionalField } from "./order-pickup-options";
import { PICKUP_OPTIONS } from "../model/pickup-options";
import { useOrder } from "@/entities/order";
import { useCartStore } from "@/entities/cart";
import { toast } from "sonner";
import { useAppNavigate } from "@/shared/hooks/use-navigate";
import { CreateOrder } from "@/entities/order";
import { PaymentModal } from "@/widgets/payment";

type PaymentModalState = {
  isOpen: boolean;
  orderId: number;
  amount: number;
};

type PaymentModalAction = 
  | { type: 'SHOW_MODAL'; payload: { orderId: number; amount: number } }
  | { type: 'HIDE_MODAL' };

const paymentModalReducer = (state: PaymentModalState, action: PaymentModalAction): PaymentModalState => {
  console.log("Reducer called with action:", action);
  console.log("Reducer current state:", state);
  
  switch (action.type) {
    case 'SHOW_MODAL':
      console.log("Reducer: SHOW_MODAL", action.payload);
      const newState = {
        isOpen: true,
        orderId: action.payload.orderId,
        amount: action.payload.amount
      };
      console.log("Reducer: new state will be:", newState);
      return newState;
    case 'HIDE_MODAL':
      console.log("Reducer: HIDE_MODAL");
      return {
        isOpen: false,
        orderId: 0,
        amount: 0
      };
    default:
      console.log("Reducer: default case, returning current state");
      return state;
  }
};

export const OrderForm = () => {
  const [selectedPickupOption, setSelectedPickupOption] = useState(PICKUP_OPTIONS[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalFields, setAdditionalFields] = useState<Record<string, string>>({});
  const [paymentModalData, dispatch] = useReducer(paymentModalReducer, {
    isOpen: false,
    orderId: 0,
    amount: 0
  });
  const { createOrder, isPending } = useOrder();
  const { items, clearCart, getTotal } = useCartStore();
  const navigate = useAppNavigate();

  const selectedOption = PICKUP_OPTIONS.find(option => option.id === selectedPickupOption);

  const handleAdditionalFieldChange = (fieldId: string, value: string) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const showPaymentModalWithData = (orderId: number, amount: number) => {
    console.log("showPaymentModalWithData called with:", { orderId, amount });
    console.log("Current paymentModalData before update:", paymentModalData);
    
    console.log("Dispatching SHOW_MODAL action");
    dispatch({ type: 'SHOW_MODAL', payload: { orderId, amount } });
    console.log("Dispatch completed");
  };

  useEffect(() => {
    console.log("PaymentModalData changed:", paymentModalData);
  }, [paymentModalData]);

  // Отладочная информация для рендера PaymentModal
  useEffect(() => {
    console.log("Rendering PaymentModal with props:", {
      isOpen: paymentModalData.isOpen,
      amount: paymentModalData.amount,
      orderId: paymentModalData.orderId.toString()
    });
  }, [paymentModalData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted", { name, phone, items, additionalFields });
    
    // Проверяем, что все обязательные поля заполнены
    if (!name.trim()) {
      toast.error("Пожалуйста, введите ваше имя");
      return;
    }
    
    if (!phone.trim()) {
      toast.error("Пожалуйста, введите номер телефона");
      return;
    }
    
    if (items.length === 0) {
      toast.error("Корзина пуста");
      return;
    }
    
    try {
      const totalAmount = getTotal();
      console.log("Total amount before clearing cart:", totalAmount);
      
      const nameToQuantity: Record<string, number> = {};
      items.forEach(item => {
        nameToQuantity[item.name] = (nameToQuantity[item.name] || 0) + item.quantity;
      });

      const orderData: CreateOrder = {
        nameToQuantity,
        address: {
          city: additionalFields.city || "Москва",
          street: additionalFields.street || "Улица",
          house: parseInt(additionalFields.house) || 1,
          apartment: additionalFields.apartment ? parseInt(additionalFields.apartment) : undefined
        }
      };

      console.log("Sending order data:", orderData);

      const response = await createOrder(orderData);
      
      console.log("Order created successfully:", response);
      console.log("Order ID:", response.data.orderId);
      console.log("Order ID type:", typeof response.data.orderId);
      console.log("Total amount:", totalAmount);
      
      if (response.data.orderId !== undefined && response.data.orderId !== null) {
        showPaymentModalWithData(response.data.orderId, totalAmount);
        toast.success("Заказ успешно создан! Ожидайте оплаты.");
        clearCart();
      } else {
        console.error("Invalid orderId received:", response.data.orderId);
        toast.error("Ошибка: неверный ID заказа");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Ошибка при создании заказа");
    }
  };

  const handleClosePaymentModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
    navigate("/orders");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <OrderPickupOptions
          options={PICKUP_OPTIONS}
          selectedOptionId={selectedPickupOption}
          onOptionChange={setSelectedPickupOption}
        />

        <div className="space-y-4">
          <Input
            label="Ваше имя"
            name="name"
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Телефон"
            name="phone"
            type="tel"
            placeholder="+7 (999) 999-99-99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          
          {selectedOption?.additionalFields.map((field: AdditionalField) => (
            <Input
              key={field.id}
              label={field.label}
              name={field.id}
              type={field.type}
              value={additionalFields[field.id] || ""}
              onChange={(e) => handleAdditionalFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isPending || items.length === 0}>
          {isPending ? "Оформление заказа..." : "Оформить заказ"}
        </Button>
      </form>

      <PaymentModal
        key={`payment-modal-${paymentModalData.isOpen}`}
        isOpen={paymentModalData.isOpen}
        onClose={handleClosePaymentModal}
        amount={paymentModalData.amount}
        orderId={paymentModalData.orderId.toString()}
      />
    </>
  );
}; 