import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { loginSchema, userSchema } from "@/entities/auth";
import { ACCESS_TOKEN_KEY } from "../../lib/consts/local-storage";
import { useAuthStore } from "@/entities/auth";
import { z } from "zod";

type Login = z.infer<typeof loginSchema>;

const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
}).strict();

export type Response = z.infer<typeof authResponseSchema>;

// Тестовые пользователи для быстрой проверки
const TEST_USERS = {
  user: {
    id: "user1",
    email: "user@example.com",
    role: "USER" as const,
    password: "password123"
  },
  admin: {
    id: "admin1",
    email: "admin@example.com",
    role: "ADMIN" as const,
    password: "admin123"
  }
};

export const authByEmailAndPassword = createService(async ({ email, password }: Login) => {
  const validatedData = loginSchema.parse({ email, password });

  try {
    // Быстрая проверка для тестовых пользователей
    const testUser = Object.values(TEST_USERS).find(u => u.email === email && u.password === password);
    if (testUser) {
      const testResponse = {
        accessToken: `mock-access-token-${testUser.id}`,
        user: {
          id: testUser.id,
          email: testUser.email,
          role: testUser.role
        }
      };
      
      localStorage.setItem(ACCESS_TOKEN_KEY, testResponse.accessToken);
      useAuthStore.getState().setAuth(testResponse.user, testResponse.accessToken);
      
      return testResponse;
    }

    const response = await $api.post('/auth/login', validatedData);
    const data = authResponseSchema.parse(response.data);

    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    useAuthStore.getState().setAuth(data.user, data.accessToken);

    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      throw new Error('Некорректный ответ от сервера');
    }
    
    if (error instanceof Error) {
      throw new Error(error.message || 'Ошибка аутентификации');
    }

    throw new Error('Неизвестная ошибка');
  }
});