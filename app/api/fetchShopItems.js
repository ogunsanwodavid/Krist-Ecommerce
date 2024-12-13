import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

export default async function fetchShopItems() {
  const { data, error } = await supabase.from("shop").select("*");

  if (error) {
    toast.error("Failed to fetch shop items");
  }

  console.log(data);

  return data;
}
