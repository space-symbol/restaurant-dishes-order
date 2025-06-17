import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Rating } from "@/shared/ui/rating";
import { createReview } from "../api/create-review";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewKeys } from "../model/query-keys";

const createReviewSchema = z.object({
  rate: z.number().min(1).max(5),
  comment: z.string().min(1, "Отзыв не может быть пустым"),
});

type CreateReviewFormData = z.infer<typeof createReviewSchema>;

interface CreateReviewFormProps {
  menuId: number;
  onSuccess?: () => void;
}

export const CreateReviewForm = ({ menuId, onSuccess }: CreateReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateReviewFormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rate: 0,
      comment: "",
    },
  });

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: (data: CreateReviewFormData) => createReview({ ...data, menuId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(menuId) });
      onSuccess?.();
    },
  });

  const onSubmit = (data: CreateReviewFormData) => {
    submitReview({ ...data, rate: rating });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Оценка</label>
        <Rating rating={rating} onRatingChange={setRating} />
        {errors.rate && (
          <p className="mt-1 text-sm text-red-600">{errors.rate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Отзыв</label>
        <Input
          {...register("comment")}
          type="text"
          placeholder="Напишите ваш отзыв"
          className="w-full"
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Отправка..." : "Отправить отзыв"}
      </Button>
    </form>
  );
}; 