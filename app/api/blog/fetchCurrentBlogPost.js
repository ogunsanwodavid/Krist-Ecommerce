import { toast } from "react-toastify";

import { supabase } from "../../lib/supabase";

export default async function fetchCurrentBlogPost(id) {
  let { data, error } = await supabase
    .from("blogs")
    .select("*") // Select all columns or specify the ones you need
    .eq("id", id); // Filter by the `id` column;

  const blogPost = data.at(0);

  if (error) {
    toast.error("Failed to fetch blog post");
  }

  return blogPost;
}
