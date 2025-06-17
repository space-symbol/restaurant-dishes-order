import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { orderKeys } from "../query-keys";
import { getUserOrders } from "../../api/get-user-orders";

interface UseUserOrdersProps {
  userName: string;
  sort?: "DATE_ASC" | "DATE_DESC";
  from?: number;
  size?: number;
}

export const useUserOrders = (
  { userName, sort = "DATE_DESC", from = 0, size = 10 }: UseUserOrdersProps,
  options?: UseQueryOptions<any>
) => {
  return useQuery({
    queryKey: orderKeys.my({ sort, from, size }),
    queryFn: () => getUserOrders({ userName, sort, from, size }),
    ...options,
  });
}; 