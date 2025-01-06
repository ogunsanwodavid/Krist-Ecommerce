import { ResetPasswordFormSchema } from "@/app/(auth)/lib/definitions/reset-password";

import { supabase } from "@/app/lib/supabase";

//Login function
export async function resetPassword(formData: FormData) {
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));

  // Validate form fields
  const validatedFields = ResetPasswordFormSchema.safeParse({
    password,
    confirmPassword,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Login user
  const { error: authError } = await supabase.auth.updateUser({
    password,
  });

  //Return any error
  if (authError) {
    return { error: authError.message };
  }

  return { success: true };
}
