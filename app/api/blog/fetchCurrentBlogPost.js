import { toast } from "react-toastify";

import { supabase } from "../../lib/supabase";

export default async function fetchCurrentBlogPost(id) {
  // Call the stored procedure to increment views
  const { error: rpcError } = await supabase.rpc("increment_views", {
    blog_id: id,
  });

  if (rpcError) {
    toast.error("Failed to increment views");
    return null; // Exit early if incrementing views fails
  }

  // Fetch the updated blog post
  const { data, error } = await supabase
    .from("blogs")
    .select("*") // Select all columns or specify the ones you need
    .eq("id", id);

  if (error) {
    toast.error("Failed to fetch blog post");
    return null; // Return null if fetching fails
  }

  const blogPost = data?.[0];

  return blogPost;
}
