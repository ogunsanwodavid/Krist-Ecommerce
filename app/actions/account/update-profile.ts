import { useCallback } from "react";

import { useAuth } from "@/contexts/AuthContext";

import { supabase } from "@/app/lib/supabase";

import { UpdateProfileFormSchema } from "../../lib/definitions/update-profile";

export function useUpdateProfile() {
  const { fetchUserProfile } = useAuth();

  const updateProfile = useCallback(
    async (formData: FormData) => {
      const firstName = String(formData.get("firstName"));
      const lastName = String(formData.get("lastName"));
      const email = String(formData.get("email"));

      // Validate form fields
      const validatedFields = UpdateProfileFormSchema.safeParse({
        firstName,
        lastName,
        email,
      });

      // If any form fields are invalid, return early
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
      }

      // Step 1: Update the email
      const { data: authData, error: authError } =
        await supabase.auth.updateUser({
          email,
        });

      // Return any signup error
      if (authError) {
        return { error: authError.message };
      }

      // Step 2: Get the userId of the signed-up user
      const userId = authData.user?.id;

      if (!userId) {
        return { error: "Failed to update profile" };
      }

      // Step 3: Edit the user's first and last name in the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          firstName,
          lastName,
        })
        .eq("userId", userId);

      if (profileError) {
        return { error: profileError.message };
      }

      // Step 4: Refetch user data
      if (fetchUserProfile) {
        fetchUserProfile(userId);
      }

      return { success: true };
    },
    [fetchUserProfile] // Dependency array ensures memoization
  );

  return updateProfile;
}
