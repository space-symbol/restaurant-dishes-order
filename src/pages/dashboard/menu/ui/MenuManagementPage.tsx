import { useCallback, useEffect, useState } from 'react';
import { getMenuItems, GetMenuItemsParams } from '@/features/menu/api/get-menu-items';
import { deleteMenuItem } from '@/features/menu/api/delete-menu-item';
import { MenuItem } from '@/entities/menu';
import { CreateMenuItemForm } from './CreateMenuItemForm';
import { EditMenuItemForm } from './EditMenuItemForm';

export const MenuManagementPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const fetchMenuItems = useCallback(async (params?: GetMenuItemsParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMenuItems(params);
      setMenuItems(response.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteMenuItem(id);
      await fetchMenuItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete menu item');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Item
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Create New Menu Item</h2>
            <CreateMenuItemForm
              onSuccess={() => {
                setIsCreating(false);
                fetchMenuItems();
              }}
              onCancel={() => setIsCreating(false)}
            />
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
            <EditMenuItemForm
              item={editingItem}
              onSuccess={() => {
                setEditingItem(null);
                fetchMenuItems();
              }}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-bold mt-2">${item.price}</p>
            <p className="text-sm text-gray-500 mt-1">Category: {item.category}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 