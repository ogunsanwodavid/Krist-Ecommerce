import { LoginFormSchema } from "@/app/(auth)/lib/definitions";

import { supabase } from "@/app/lib/supabase";

//Login function
export async function login(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const rememberMe = Boolean(formData.get("rememberMe"));

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
    rememberMe,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Login user
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  //Check if user has verified email
  if (!authData.user?.email_confirmed_at) {
    return { error: "Please verify your email before logging in." };
  }

  //Return any login error
  if (authError) {
    return { error: authError.message };
  }

  // Handle session persistence
  if (!rememberMe) {
    // Remove session data from localStorage if "Remember Me" is unchecked
    localStorage.removeItem(`supabase.auth.token`);
  }

  console.log(authData);

  return { success: true };
}
