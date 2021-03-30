import { QueryClient } from "react-query";

const ONE_HOUR = 1000 * 60 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: ONE_HOUR, cacheTime: ONE_HOUR },
  },
});
