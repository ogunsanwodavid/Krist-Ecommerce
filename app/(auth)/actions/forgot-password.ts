import { ForgotPasswordFormSchema } from "@/app/(auth)/lib/definitions/forgot-password";

import { supabase } from "@/app/lib/supabase";

//Base URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//Request password reset function
export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email"));

  // Validate form fields
  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Request for password reset
  const { error: authError } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${baseUrl}/reset-password`,
    }
  );

  //Return any error
  if (authError) {
    return { error: authError.message };
  }

  return { success: true };

  console.log(baseUrl);
}
