export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type MenuItemSort = 'AZ' | 'ZA' | 'PRICE_ASC' | 'PRICE_DESC' | 'DATE_ASC' | 'DATE_DESC';

export type MenuItemCategory = 'appetizers' | 'main_courses' | 'desserts' | 'drinks'; 