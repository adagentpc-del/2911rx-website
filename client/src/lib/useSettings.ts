import { useQuery } from "@tanstack/react-query";

export type PublicSettings = {
  contact_email?: string;
  contact_phone?: string;
  calendar_url?: string;
};

/** Public, site-editable settings (managed by admins in the dashboard). */
export function useSettings() {
  const { data } = useQuery<PublicSettings>({
    queryKey: ["/api/settings/public"],
    staleTime: 5 * 60_000,
  });
  return data ?? {};
}
