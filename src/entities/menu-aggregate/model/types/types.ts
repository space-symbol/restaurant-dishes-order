import { MenuItem, MenuItemCategory, MenuItemSort } from "@/entities/menu/model/types/types";
import { Review, ReviewSort } from "@/entities/review/model/types/types";

export type MenuItemWithReviews = MenuItem & {
  reviews: Review[];
  rating: number;
  averageRating: number;
};

export type MenuItemWithRating = MenuItem & {
  rating: number;
  averageRating: number;
};

export type MenuAggregatePaginationParams = {
  sort?: MenuItemSort | 'RATE_ASC' | 'RATE_DESC';
  from?: number;
  size?: number;
}; 