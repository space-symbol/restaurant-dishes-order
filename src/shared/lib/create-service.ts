export type ServiceResponse<T> = {
  data: T | null;
  error: string | null;
}



 
export function createService<A, R>(service: (args: A) => Promise<R>): (args: A) => Promise<ServiceResponse<R>> {
  return async (args: A) => {
    try {
      const data = await service(args);
      return { data, error: null };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unknown error');
    }
  }}