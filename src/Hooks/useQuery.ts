import { queryClient } from "Configs/queryConfigs";
import {
  useMutation,
  useQuery,
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "react-query";

export const useGet = <T extends any[], R>(
  fetcher: ((...args: T) => Promise<R>) & { queryKey?: string },
  config?: UseQueryOptions<R, { response: { data: { message: string } } }>,
  ...args: Parameters<typeof fetcher>
) => {
  return useQuery(
    [fetcher.queryKey, args[0]],
    () => {
      return fetcher(...args);
    },
    config
  );
};

export const useMutate = <
  T extends any[],
  R = unknown,
  TError = { response: { data: { message: string } } },
  TSnapshot = unknown
>(
  fetcher: (...args: T) => Promise<R>,
  config?: UseMutationOptions<R, TError, T, TSnapshot>
) => {
  const { mutate, ...resultObj } = useMutation(
    (args: Parameters<typeof fetcher>) => fetcher(...args),
    config
  );
  return {
    mutate: (
      config?: UseMutationOptions<R, TError, T, TSnapshot>,
      ...args: Parameters<typeof fetcher>
    ) => mutate(args, config),
    ...resultObj,
  };
};

export const refetchQueries = (
  fns: (...args: any[]) => any | ((...args: any[]) => any)[]
) => {
  if (!Array.isArray(fns)) {
    // @ts-ignore
    queryCache.invalidateQueries(fns.queryKey, {
      refetchInactive: true,
      refetchActive: true,
    });
  } else {
    fns.forEach((fn) => {
      queryClient.invalidateQueries(fn.queryKey, {
        refetchInactive: true,
        refetchActive: true,
      });
    });
  }
};

export const prefetchQuery = <T extends any[], R>(
  fetcher: ((...args: T) => Promise<R>) & { queryKey?: string },
  ...args: Parameters<typeof fetcher>
) => {
  queryClient.prefetchQuery([fetcher.queryKey, args[0]], () => {
    return fetcher(...args);
  });
};
