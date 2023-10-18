import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as backendAPI from "./apiClient.ts";
import { queryKeys } from "./queryKeys.ts";
import { CreateTaskArgs, UpdateTaskStatusArgs } from "./types.ts";
import { useCurrentUserDetailsQuery } from "./queries.ts";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: { email: string; password: string }) => await backendAPI.login(args.email, args.password),

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.currentUser(), data);
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (args: { email: string; password: string }) => await backendAPI.signUp(args.email, args.password),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_args: unknown) => await backendAPI.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.currentUser() });
    },
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  const currentUserQuery = useCurrentUserDetailsQuery();

  return useMutation({
    mutationFn: async (args: CreateTaskArgs) => {
      if (currentUserQuery.data) {
        await backendAPI.createTask(args);
      }
    },

    onSuccess: async () => {
      if (currentUserQuery.data) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.userTasks(currentUserQuery.data.id) });
      }
    },
  });
};

export const useUpdateTaskStatusMutation = () => {
  const queryClient = useQueryClient();
  const currentUserQuery = useCurrentUserDetailsQuery();

  return useMutation({
    mutationFn: async (args: UpdateTaskStatusArgs) => {
      if (currentUserQuery.data) {
        await backendAPI.updateTaskStatus(args);
      }
    },

    onSuccess: async () => {
      if (currentUserQuery.data) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.userTasks(currentUserQuery.data.id) });
      }
    },
  });
};
