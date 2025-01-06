import { ForgotPasswordFormSchema } from "@/app/(auth)/lib/definitions/forgot-password";

import { supabase } from "@/app/lib/supabase";

//Site URL
const siteUrl =
  process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
  process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
  "http://localhost:3000/";

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
      redirectTo: `${siteUrl}/reset-password`,
    }
  );

  //Return any error
  if (authError) {
    return { error: authError.message };
  }

  return { success: true };
}
