import { AddReviewFormSchema } from "@/app/lib/definitions/add-review";

export function addReview(formData: FormData) {
  const itemId = Number(formData.get("itemId"));
  const userId = String(formData.get("userId"));
  const avatar = String(formData.get("avatar"));
  const name = String(formData.get("name"));
  const rating = Number(formData.get("rating"));
  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const createdAt = String(formData.get("createdAt"));

  // Validate form fields
  const validatedFields = AddReviewFormSchema.safeParse({
    itemId,
    userId,
    avatar,
    name,
    rating,
    title,
    description,
    createdAt,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { success: true, data: validatedFields.data };
}
