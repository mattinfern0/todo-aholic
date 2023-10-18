import { useQuery } from "@tanstack/react-query";
import * as backendAPI from "./apiClient.ts";
import { queryKeys } from "./queryKeys.ts";

export const useCurrentUserDetailsQuery = () => {
  return useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: async () => await backendAPI.getCurrentUserDetails(),
    retry: false,
  });
};

export const useUserTasksQuery = () => {
  const userQuery = useCurrentUserDetailsQuery();

  const userId = userQuery.data?.id ?? null;

  return useQuery({
    queryKey: queryKeys.userTasks(userId),
    queryFn: async () => await backendAPI.getUserTasks(),
    enabled: userId != null,
  });
};

export const useUserTaskListsQuery = () => {
  const userQuery = useCurrentUserDetailsQuery();

  const userId = userQuery.data?.id ?? null;

  return useQuery({
    queryKey: queryKeys.userTaskLists(userId),
    queryFn: async () => await backendAPI.getUserTaskLists(),
    enabled: userId != null,
  });
};
