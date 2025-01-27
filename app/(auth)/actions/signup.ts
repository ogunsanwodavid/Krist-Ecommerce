import { SignupFormSchema } from "@/app/(auth)/lib/definitions/signup";

import { supabase } from "@/app/lib/supabase";

//Site URL
const siteUrl =
  process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
  process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
  "http://localhost:3000/";

//Signup function
export async function signup(formData: FormData, pageRedirect: string) {
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

  console.log(siteUrl);

  /* // Step 1: Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //Redirect after email confirmation
      emailRedirectTo: `${siteUrl}/login?redirect=${pageRedirect}`,
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

  return { success: true }; */
}
