export const orderKeys = {
  all: ['order'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: any) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  byUser: (userId: string) => [...orderKeys.all, 'byUser', userId] as const,
  my: () => [...orderKeys.all, 'my'] as const,
}; 