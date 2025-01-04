import { SignupFormSchema } from "@/app/(auth)/lib/definitions";

import { supabase } from "@/app/lib/supabase";

//Base URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//Signup function
export async function signup(formData: FormData) {
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Step 1: Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //Redirect to login page after email confirmation
      emailRedirectTo: `${baseUrl}/login`,
    },
  });

  //Return any signup error
  if (authError) {
    return { error: authError.message };
  }

  // Step 2: Get the userId of the signed-up user
  const userId = authData.user?.id;

  if (!userId) {
    return { error: "Failed to retrieve user ID after signup." };
  }

  // Step 3: Insert the user's first and last name into the profiles table
  const { error: profileError } = await supabase.from("profiles").insert({
    userId,
    firstName,
    lastName,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  return { success: true };
}
