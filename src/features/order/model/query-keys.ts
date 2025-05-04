export const orderKeys = {
  all: ['order'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: any) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  byUser: (userId: string, { from, size }: { from: number; size: number }) => 
    [...orderKeys.all, 'byUser', userId, { from, size }] as const,
  my: ({ from, size, sort }: { from: number; size: number; sort: 'DATE_ASC' | 'DATE_DESC' }) => 
    [...orderKeys.all, 'my', { from, size, sort }] as const,
}; 