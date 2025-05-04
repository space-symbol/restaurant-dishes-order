export const menuAggregateKeys = {
  all: ['menu-aggregate'] as const,
  menuItemsWithRatings: () => [...menuAggregateKeys.all, 'menuItemsWithRatings'] as const,
  menuItemWithReviews: (id: string) => [...menuAggregateKeys.all, 'menuItemWithReviews', id] as const,
}; 