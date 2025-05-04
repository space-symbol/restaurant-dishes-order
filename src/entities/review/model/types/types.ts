export type Review = {
  reviewId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ReviewSort = 'DATE_ASC' | 'DATE_DESC';

export type ReviewRating = {
  menuItemId: string;
  rating: number;
  averageRating: number;
};

export type ReviewPaginationParams = {
  sort?: ReviewSort;
  from?: number;
  size?: number;
}; 