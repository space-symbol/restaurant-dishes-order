export const SORT_OPTIONS = [
  { value: 'AZ', label: 'По алфавиту (А-Я)' },
  { value: 'ZA', label: 'По алфавиту (Я-А)' },
  { value: 'PRICE_ASC', label: 'По возрастанию цены' },
  { value: 'PRICE_DESC', label: 'По убыванию цены' },
  { value: 'RATE_ASC', label: 'По возрастанию рейтинга' },
  { value: 'RATE_DESC', label: 'По убыванию рейтинга' },
];

export const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'Все категории' },
  { value: 'PASTA', label: 'Паста' },
  { value: 'MEAT', label: 'Мясо' },
  { value: 'SALAD', label: 'Салаты' },
  { value: 'DESSERT', label: 'Десерты' },
  { value: 'DRINK', label: 'Напитки' },
  { value: 'BREAKFAST', label: 'Завтрак' },
  { value: 'LUNCH', label: 'Обед' },
];

export const CATEGORY_MAP = {
  PASTA: 'Паста',
  MEAT: 'Мясо',
  SALAD: 'Салаты',
  DESSERT: 'Десерты',
  DRINK: 'Напитки',
  BREAKFAST: 'Завтрак',
  LUNCH: 'Обед',
} as const; 