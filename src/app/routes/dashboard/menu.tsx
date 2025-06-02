import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { Route } from "./+types";
import { useMenuItems, useCreateMenuItem, useUpdateMenuItem, useDeleteMenuItem } from "@/features/menu";
import { MenuItem, CreateMenuItemDto, MenuItemCategory } from "@/entities/menu";
import { formatCurrency } from "@/shared/lib/currency";
import { Select } from "@/shared/ui/select";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "@/shared/constants/menu-options";
import { toast } from "sonner";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: `Savory | Управление меню` },
    { name: "description", content: `Управление меню` },
  ];
}

export default function DashboardMenu() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const {
    items,
    total,
    currentPage,
    pageSize,
    isLoading,
    error,
    sort,
    category,
    handlePageChange,
    handleSortChange,
    handleCategoryChange,
  } = useMenuItems();

  const { mutateAsync: createItem, isPending: isCreatingItem } = useCreateMenuItem();
  const { mutateAsync: updateItem, isPending: isUpdatingItem } = useUpdateMenuItem();
  const { mutateAsync: deleteItem, isPending: isDeletingItem } = useDeleteMenuItem();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: CreateMenuItemDto = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as MenuItemCategory,
      price: Number(formData.get('price')),
      availability: true,
    };

    try {
      if (editingItem) {
        const response = await updateItem({
          id: editingItem.id,
          updates: data
        });
        if (response.data) {
          setIsCreating(false);
          setEditingItem(null);
          e.currentTarget.reset();
        }
      } else {
        const response = await createItem(data);
        if (response.data) {
          setIsCreating(false);
          setEditingItem(null);
          e.currentTarget.reset();
        }
      }
    } catch (err) {
      console.error('Failed to save menu item:', err);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить это блюдо?')) {
      return;
    }

    try {
      const response = await deleteItem(id);
      if (response.data === null) {
        toast.success('Блюдо удалено успешно');
      }
    } catch (err) {
      console.error('Failed to delete menu item:', err);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Управление меню</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreating(true)}>Добавить блюдо</Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Select
          value={category || 'ALL'}
          onValueChange={(value) => handleCategoryChange(value === 'ALL' ? undefined : value as MenuItemCategory)}
          options={CATEGORY_OPTIONS}
        />

        <Select
          value={sort || 'NAME_ASC'}
          onValueChange={(value) => handleSortChange(value as typeof sort)}
          options={SORT_OPTIONS}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded h-full">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto h-auto">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-600 mb-4">{item.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{formatCurrency(item.price)}</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(item)}
                      disabled={isUpdatingItem}
                    >
                      Редактировать
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeletingItem}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Назад
              </Button>
              <span className="px-4 py-2">
                Страница {currentPage + 1} из {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                Вперед
              </Button>
            </div>
          )}
        </>
      )}

      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-2xl p-6 relative bg-white">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? 'Редактировать блюдо' : 'Добавить блюдо'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Название</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  placeholder="Введите название блюда"
                  defaultValue={editingItem?.name}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Описание</label>
                <textarea
                  name="description"
                  className="w-full p-2 border rounded"
                  placeholder="Введите описание блюда"
                  defaultValue={editingItem?.description}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Категория</label>
                <Select
                  name="category"
                  defaultValue={editingItem?.category}
                  required
                  options={CATEGORY_OPTIONS}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Цена</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border rounded"
                  placeholder="Введите цену"
                  defaultValue={editingItem?.price}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Фото</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
                >
                  Отмена
                </Button>
                <Button 
                  type="submit"
                  disabled={isCreatingItem || isUpdatingItem}
                >
                  {editingItem ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </main>
  );
} 