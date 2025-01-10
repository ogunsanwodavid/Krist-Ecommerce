import { supabase } from "@/app/lib/supabase";

import { toast } from "react-toastify";

//Logout function
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Failed to log out!");
    return { error: error.message };
  } else {
    toast.success("Successfully logged out!");
    return { success: true };
  }
}
