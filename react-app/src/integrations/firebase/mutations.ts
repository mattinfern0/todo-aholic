import { useAuth } from "./AuthContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async (args: { email: string; password: string }) => {
      return await auth.login(args.email, args.password);
    },
  });
};

export const useSignUpMutation = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async (args: { email: string; password: string }) => {
      return await auth.signUp(args.email, args.password);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation({
    mutationFn: async (_args: unknown) => {
      queryClient.clear();
      return await auth.logout();
    },
  });
};
