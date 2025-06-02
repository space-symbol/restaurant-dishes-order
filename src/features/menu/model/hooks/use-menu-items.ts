import { useState, useCallback, useEffect } from 'react';
import { MenuItem, CreateMenuItemDto } from '@/entities/menu';
import { getMenuItems } from '../../api/get-menu-items';
import { createMenuItem } from '../../api/create-menu-item';
import { ServiceResponse } from '@/shared/api/create-service';

const DEFAULT_PAGE_SIZE = 9;

type MenuSort = 'PRICE_ASC' | 'PRICE_DESC' | 'NAME_ASC' | 'NAME_DESC';
type MenuCategory = 'APPETIZER' | 'MAIN' | 'DESSERT' | 'DRINK';

interface MenuItemsResponse {
  items: MenuItem[];
  total: number;
  from: number;
  size: number;
}

export const useMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<MenuSort>('NAME_ASC');
  const [category, setCategory] = useState<MenuCategory | undefined>();

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getMenuItems({
        from: currentPage * DEFAULT_PAGE_SIZE,
        size: DEFAULT_PAGE_SIZE,
        sort,
        category,
      });
      const data = response.data as MenuItemsResponse;
      setItems(data.items);
      setTotal(data.total);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sort, category]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = useCallback(async (data: CreateMenuItemDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await createMenuItem(data);
      const newItem = response.data as MenuItem;
      setItems(prev => [...prev, newItem]);
      setTotal(prev => prev + 1);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create menu item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSortChange = useCallback((newSort: MenuSort) => {
    setSort(newSort);
    setCurrentPage(0);
  }, []);

  const handleCategoryChange = useCallback((newCategory: MenuCategory | undefined) => {
    setCategory(newCategory);
    setCurrentPage(0);
  }, []);

  return {
    items,
    total,
    currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
    isLoading,
    error,
    sort,
    category,
    fetchItems,
    createItem,
    handlePageChange,
    handleSortChange,
    handleCategoryChange,
  };
}; 