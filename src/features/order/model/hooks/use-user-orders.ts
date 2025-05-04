import { useQuery } from "@tanstack/react-query";
import { orderKeys } from "../query-keys";
import { getUserOrders } from "../../api/get-user-orders";

interface UseUserOrdersProps {
  sort?: "DATE_ASC" | "DATE_DESC";
  from?: number;
  size?: number;
}

export const useUserOrders = ({ sort = "DATE_DESC", from = 0, size = 10 }: UseUserOrdersProps = {}) => {
  return useQuery({
    queryKey: orderKeys.my({ sort, from, size }),
    queryFn: () => getUserOrders({ sort, from, size }),
  });
}; 