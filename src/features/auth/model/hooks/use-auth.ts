import { ServiceResponse } from "@/shared/lib/create-service";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/register/register";
import { authByEmailAndPassword } from "../../api/auth-by-email-and-password/auth-by-email-and-password";

interface RegisterData {
  email: string;
  password: string;
}

interface AuthProps {
  email: string;
  password: string;
}

interface UseAuthOptions {
  isRegister: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useAuth = (options: UseAuthOptions) => {
  const { isRegister, onSuccess, onError } = options;

  const {mutate, error, isPending} = useMutation<ServiceResponse<string | { accessToken: string }>, Error, RegisterData | AuthProps>({
    mutationFn: (data) => isRegister ? register(data) : authByEmailAndPassword(data),
    onSuccess: () => {
      console.log("Authentication successful");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
      onError?.(error);
    }
  });

  return {
    mutate,
    error,
    isPending
  }
}