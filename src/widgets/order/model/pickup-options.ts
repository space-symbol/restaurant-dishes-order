import { PickupOption } from "../ui/order-pickup-options";

export const PICKUP_OPTIONS: PickupOption[] = [
  {
    id: "self-pickup",
    name: "Самовывоз",
    description: "Заберите заказ в ресторане после приготовления",
    additionalFields: [],
  },
  {
    id: "delivery",
    name: "Доставка",
    description: "Доставка курьером",
    additionalFields: [
      {
        id: "address",
        type: "text",
        label: "Адрес доставки",
        placeholder: "Введите адрес доставки",
        required: true,
      },
    ],
  },
]; 