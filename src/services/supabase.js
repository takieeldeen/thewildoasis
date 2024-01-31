import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zyxpnmxvhuysgqgcrtjr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eHBubXh2aHV5c2dxZ2NydGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMzU3NDYsImV4cCI6MjAyMDgxMTc0Nn0.jYG58paCkVsQHG67P1EPh6dJ6Q0pZJiY6HGHOxTMovI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
