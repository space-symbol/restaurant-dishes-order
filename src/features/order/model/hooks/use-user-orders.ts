import { useQuery } from "@tanstack/react-query";
import { orderKeys } from "../query-keys";
import { getOrders } from "../../api/get-orders";

interface UseUserOrdersProps {
  sort?: "DATE_ASC" | "DATE_DESC";
  from?: number;
  size?: number;
} 

export const useUserOrders = ({ sort, from, size }: UseUserOrdersProps) => {
  return useQuery({
    queryKey: orderKeys.my(),
    queryFn: async () => await getOrders({ sort, from, size }),
  });
}; 