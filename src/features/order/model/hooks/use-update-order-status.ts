import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServiceResponse } from "@/shared/api/create-service";
import { updateOrderStatus } from "../../api/update-order-status";
import { Order } from "@/entities/order/model/schemas";
import { orderKeys } from "../query-keys";
import { OrderStatus } from "@/entities/order/model/schemas";

export type UpdateOrderStatusData = {
  status: "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  orderId: number;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<
    ServiceResponse<Order>,
    Error,
    UpdateOrderStatusData
  >({
    mutationFn: (data) => updateOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: orderKeys.my({ from: 0, size: 10, sort: 'DATE_DESC' }) 
      });
    },
  });

  return {
    updateStatus: mutateAsync,
    isPending,
  };
}; 