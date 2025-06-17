import { useMutation } from "@tanstack/react-query";
import { ServiceResponse } from "@/shared/api/create-service";
import { createOrder } from "../../api/create-order";
import { CreateOrder, Order } from "@/entities/order";

export const useCreateOrder = () => {
  const { mutateAsync, isPending } = useMutation<ServiceResponse<Order>, Error, CreateOrder>({
    mutationFn: (data) => createOrder(data)
  });

  return {
    createOrder: mutateAsync,
    isPending,
  };
}; 