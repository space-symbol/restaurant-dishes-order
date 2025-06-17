import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { OrderPickupOptions, AdditionalField } from "./order-pickup-options";
import { PICKUP_OPTIONS } from "../model/pickup-options";
import { useOrder } from "@/entities/order";
import { useCartStore } from "@/entities/cart";
import { toast } from "sonner";
import { useAppNavigate } from "@/shared/hooks/use-navigate";
import { CreateOrder } from "@/entities/order";

export const OrderForm = () => {
  const [selectedPickupOption, setSelectedPickupOption] = useState(PICKUP_OPTIONS[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalFields, setAdditionalFields] = useState<Record<string, string>>({});
  const { createOrder, isPending } = useOrder();
  const { items, clearCart } = useCartStore();
  const navigate = useAppNavigate();

  const selectedOption = PICKUP_OPTIONS.find(option => option.id === selectedPickupOption);

  const handleAdditionalFieldChange = (fieldId: string, value: string) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert cart items to nameToQuantity format
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

      await createOrder(orderData);

      clearCart();
      toast.success("Заказ успешно создан!");
      navigate("/orders");
    } catch (error) {
      toast.error("Ошибка при создании заказа");
    }
  };

  return (
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
  );
}; 