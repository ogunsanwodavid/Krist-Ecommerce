import { supabase } from "@/app/lib/supabase";

import { ContactUsFormSchema } from "@/app/lib/definitions/contact-us";

export async function contactUs(formData: FormData) {
  const email = String(formData.get("email"));
  const name = String(formData.get("name"));
  const message = String(formData.get("message"));

  // Validate form fields
  const validatedFields = ContactUsFormSchema.safeParse({
    email,
    name,
    message,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Submit contact information to server
  const { error } = await supabase.from("contact-us").insert({
    email,
    name,
    message,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
