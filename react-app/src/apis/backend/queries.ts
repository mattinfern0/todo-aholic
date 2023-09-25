import { useQuery } from "@tanstack/react-query";
import * as backendAPI from "./apiClient.ts";
import { queryKeys } from "./queryKeys.ts";

export const useCurrentUserDetailsQuery = () => {
  return useQuery(queryKeys.currentUser(), async () => await backendAPI.getCurrentUserDetails(), { retry: false });
};
