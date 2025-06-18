import { createService } from "@/shared/api/create-service";
import { loginSchema, userSchema } from "@/entities/auth";
import { ACCESS_TOKEN_KEY } from "../../lib/consts/local-storage";
import { useAuthStore } from "@/entities/auth";
import { authenticateUser } from "../manage-users/manage-users";
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
    // Используем новую систему аутентификации
    const authResult = authenticateUser(email, password);
    
    if (!authResult) {
      throw new Error('Неверный email или пароль');
    }

    const response = {
      accessToken: authResult.token,
      user: authResult.user
    };

    localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
    useAuthStore.getState().setAuth(response.user, response.accessToken);

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      throw new Error('Некорректные данные для входа');
    }
    
    if (error instanceof Error) {
      throw new Error(error.message || 'Ошибка аутентификации');
    }

    throw new Error('Неизвестная ошибка');
  }
});