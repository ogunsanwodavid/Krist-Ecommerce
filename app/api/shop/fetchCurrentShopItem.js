import { toast } from "react-toastify";

import { supabase } from "../../lib/supabase";

export default async function fetchCurrentShopItem(id) {
  let { data, error } = await supabase
    .from("shop")
    .select("*") // Select all columns or specify the ones you need
    .eq("id", id); // Filter by the `id` column;

  const shopItem = data.at(0);

  if (error) {
    toast.error("Failed to fetch current shop item");
  }

  return shopItem;
}
