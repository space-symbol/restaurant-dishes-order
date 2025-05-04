import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServiceResponse } from "@/shared/api/create-service";
import { updateOrderStatus } from "../../api/update-order-status";
import { Order } from "@/entities/order/model/types/types";
import { orderKeys } from "../query-keys";
import { OrderStatus } from "@/entities/order/model/schemas";

interface UpdateOrderStatusData {
  orderId: string;
  status: OrderStatus;
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<
    ServiceResponse<Order>,
    Error,
    UpdateOrderStatusData
  >({
    mutationFn: (data) => updateOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.my() });
    },
  });

  return {
    updateStatus: mutateAsync,
    isPending,
  };
}; 