import { createService } from "@/shared/api/create-service";
import { registerSchema } from "@/entities/auth/model/schemas";
import { registerUser } from "../manage-users/manage-users";
import { ACCESS_TOKEN_KEY } from "../../lib/consts/local-storage";
import { useAuthStore } from "@/entities/auth";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    role: z.enum(["USER", "ADMIN"])
  }),
  accessToken: z.string()
});

type Register = z.infer<typeof registerSchema>;
type Response = z.infer<typeof responseSchema>;

export const register = createService<Register, Response>(async (data) => {
  const validatedData = registerSchema.parse(data);
  
  try {
    const result = registerUser(validatedData.email, validatedData.password);
    
    // Сохраняем токен и пользователя в store
    localStorage.setItem(ACCESS_TOKEN_KEY, result.token);
    useAuthStore.getState().setAuth(result.user, result.token);
    
    return {
      message: "Регистрация успешна",
      user: result.user,
      accessToken: result.token
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Ошибка при регистрации');
  }
});