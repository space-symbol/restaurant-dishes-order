import { $api } from "@/shared/api/instance";
import { createService } from "@/shared/api/create-service";
import { menuItemSchema } from "@/entities/menu/model/schemas";
import { z } from "zod";

type Response = z.infer<typeof menuItemSchema>;

export const getMenuItem = createService<string, Response>(async (id) => {
  console.log('getMenuItem called with id:', id);
  const response = await $api.get(`/v1/menu-items/${id}`);
  console.log('getMenuItem full response:', response);
  console.log('getMenuItem response.data:', response.data);
  
  // Check if the data exists
  if (!response.data) {
    throw new Error('API response is empty');
  }
  
  // Handle different response structures
  // Mock API returns { data: menuItem }
  // Real API might return { data: { data: menuItem } }
  const dataToParse = response.data.data || response.data;
  
  if (!dataToParse) {
    throw new Error('Menu item data not found in response');
  }
  
  try {
    const parsed = menuItemSchema.parse(dataToParse);
    console.log('getMenuItem parsed successfully:', parsed);
    return parsed;
  } catch (error) {
    console.error('getMenuItem parsing error:', error);
    throw error;
  }
}); 