import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { registerSchema } from "@/entities/auth/model/schemas";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string()
});

type Register = z.infer<typeof registerSchema>;
type Response = z.infer<typeof responseSchema>;

export const register = createService<Register, Response>(async (data) => {
  const validatedData = registerSchema.parse(data);
  const response = await $api.post("/auth/registration", validatedData);
  return responseSchema.parse(response.data);
});