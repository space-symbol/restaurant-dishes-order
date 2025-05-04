export const menuKeys = {
  all: ['menu'] as const,
  lists: () => [...menuKeys.all, 'list'] as const,
  list: (filters: any) => [...menuKeys.lists(), filters] as const,
  details: () => [...menuKeys.all, 'detail'] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
}; 