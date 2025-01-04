import { ForgotPasswordFormSchema } from "@/app/(auth)/lib/definitions";

//import { supabase } from "@/app/lib/supabase";

//Request password reset function
export async function requestPasswordReset(formData: FormData) {
  // Validate form fields
  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
}
