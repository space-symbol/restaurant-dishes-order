import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/lib/create-service";
import { registerSchema } from "@/entities/auth/model/schemas";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string(),
});

type Register = z.infer<typeof registerSchema>;
type Response = z.infer<typeof responseSchema>;

export const register = createService(async (data: Register) => {
  const validatedData = registerSchema.parse(data);
  const response = await $api.post<Response>("/auth/registration", validatedData);

  if (response.status !== 200) {
    throw new Error("Ошибка регистрации");
  }

  return responseSchema.parse(response.data).message;
});