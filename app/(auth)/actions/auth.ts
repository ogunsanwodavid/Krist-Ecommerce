import { LoginFormSchema, LoginFormState } from "@/app/(auth)/lib/definitions";

export async function login(state: LoginFormState, formData: FormData) {
  // Extract form fields
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("rememberMe") === "";

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      currentState: {
        email: email, // Retain current input or previous state
        password: password,
        rememberMe: rememberMe,
      },
    };
  }

  // Call the provider or db to create a user...
}
