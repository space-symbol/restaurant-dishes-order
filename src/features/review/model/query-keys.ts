export const reviewKeys = {
  all: ['review'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  list: (filters: any) => [...reviewKeys.lists(), filters] as const,
  details: () => [...reviewKeys.all, 'detail'] as const,
  detail: (id: string) => [...reviewKeys.details(), id] as const,
  byMenuItem: (menuItemId: string) => [...reviewKeys.all, 'byMenuItem', menuItemId] as const,
  byUser: (userId: string) => [...reviewKeys.all, 'byUser', userId] as const,
  ratings: () => [...reviewKeys.all, 'ratings'] as const,
  menuItemRatings: (menuItemIds: string[]) => [...reviewKeys.ratings(), menuItemIds] as const,
}; 