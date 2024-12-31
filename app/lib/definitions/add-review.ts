import { z } from "zod";

export const AddReviewFormSchema = z.object({
  itemId: z.number(),
  userId: z.string(),
  avatar: z.string(),
  name: z.string().min(1, { message: "Your name is required." }),
  rating: z.number(),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  createdAt: z.string(),
});

export type AddReviewFormState =
  | {
      errors?: {
        name?: string[];
        title: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
