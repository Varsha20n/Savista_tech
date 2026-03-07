import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { Portfolio } from "@shared/schema";

export function usePortfolio() {
  return useQuery({
    queryKey: [api.portfolio.list.path],
    queryFn: async () => {
      const res = await fetch(api.portfolio.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return api.portfolio.list.responses[200].parse(await res.json());
    },
  });
}
