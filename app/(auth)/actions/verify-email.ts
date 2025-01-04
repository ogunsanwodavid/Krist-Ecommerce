import { VerifyEmailFormSchema } from "@/app/(auth)/lib/definitions";

//import { supabase } from "@/app/lib/supabase";

//Email verification function
export async function verifyEmail(formData: FormData) {
  // Validate form fields
  const validatedFields = VerifyEmailFormSchema.safeParse({
    otp: formData.get("otp"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
}
