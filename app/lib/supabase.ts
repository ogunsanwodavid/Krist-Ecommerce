import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function formatToSupabaseImageUrl(
  folder: string,
  fileName: string
): string {
  const cleanedFileName = fileName.replace("/", "");
  const supabaseImageUrl = `${supabaseUrl}/storage/v1/object/public/${folder}/${cleanedFileName}?t=2024-12-04T21%3A55%3A48.552Z`;

  return supabaseImageUrl;
}
