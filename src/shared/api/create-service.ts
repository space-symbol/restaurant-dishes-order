import { ZodError } from "zod";

export type ServiceResponse<T> = {
  data: T | null;
}

export function createService<A, R>(service: (args: A) => Promise<R>): (args: A) => Promise<ServiceResponse<R>> {
  return async (args: A) => {
    try {
      const data = await service(args);
      return { data };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error("Ошибка при получении данных");
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Неизвестная ошибка");
      }
    }
  }}