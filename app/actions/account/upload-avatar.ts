import { useCallback } from "react";

import { supabase } from "@/app/lib/supabase";

import { useAuth } from "@/contexts/AuthContext";

export function useUploadAvatar() {
  const { fetchUserProfile } = useAuth();

  const uploadAvatar = useCallback(
    async (file: File, userId: string) => {
      // 1. Generate a custom file name
      const timestamp = new Date().getTime(); // Get current timestamp
      const fileExtension = file.name.split(".").pop(); // Extract file extension
      const customFileName = `avatar-${userId}-${timestamp}.${fileExtension}`; // Custom file name
      const filePath = `${customFileName}`; // File path in the bucket

      console.log(customFileName);

      // 2. Upload the image to the bucket
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true, // Overwrites file if it already exists
        });

      if (storageError) {
        return { error: storageError.message };
      }

      // 3. Generate a public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // 4. Save the public URL to the user's profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: publicUrl })
        .eq("userId", userId);

      if (updateError) {
        return { error: updateError.message };
      }

      // 5. Refetch user data
      if (fetchUserProfile) {
        fetchUserProfile(userId);
      }

      return { success: true, avatarUrl: publicUrl };
    },
    [fetchUserProfile]
  );

  return uploadAvatar;
}
