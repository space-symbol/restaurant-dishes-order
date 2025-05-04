import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { loginSchema, authResponseSchema } from "@/entities/auth";
import { ACCESS_TOKEN_KEY } from "../../lib/consts/local-storage";
import { useAuthStore } from "@/entities/auth";
import { z } from "zod";

type Login = z.infer<typeof loginSchema>;
type Response = z.infer<typeof authResponseSchema>;

const TEST_USER = {
  id: "test-id",
  email: "test@test.com",
  role: "ADMIN" as const,
};

export const authByEmailAndPassword = createService(async ({ email, password }: Login): Promise<Response> => {
  const validatedData = loginSchema.parse({ email, password });

  try {
    if (process.env.NODE_ENV === 'development' && email === "test@test.com" && password === "password") {
      const testResponse = {
        accessToken: "test-token",
        user: TEST_USER
      };
      
      localStorage.setItem(ACCESS_TOKEN_KEY, testResponse.accessToken);
      useAuthStore.getState().setAuth(testResponse.user, testResponse.accessToken);
      
      return testResponse;
    }

    const response = await $api.post<Response>('/auth/login', validatedData);

    if (response.status !== 200) {
      throw new Error('Ошибка аутентификации');
    }

    const data = authResponseSchema.parse(response.data);
    
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    
    useAuthStore.getState().setAuth(data.user, data.accessToken);

    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Некорректный ответ от сервера');
    }
    
    if (error instanceof Error) {
      throw new Error(error.message || 'Ошибка аутентификации');
    }

    throw new Error('Неизвестная ошибка');
  }
});