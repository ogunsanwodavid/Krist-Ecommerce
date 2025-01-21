import { toast } from "react-toastify";

import { supabase } from "../../lib/supabase";

export default async function fetchBlogPosts() {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    toast.error("Failed to fetch blog posts");
  }

  return data;
}
