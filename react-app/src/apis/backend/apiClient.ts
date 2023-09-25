import { backendApiConfig } from "../../configs.ts";
import { BackendApiConnectionError, BackendApiError, UserDetails, UserDetailsSchema } from "./types.ts";

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const login = async (email: string, password: string): Promise<UserDetails> => {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    throw new BackendApiError();
  }

  return UserDetailsSchema.parse(await res.json());
};

export const logout = async (): Promise<void> => {
  await apiFetch("/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUserDetails = async (): Promise<UserDetails> => {
  const res = await apiFetch("/users/me");

  if (!res.ok) {
    throw new BackendApiError();
  }

  return UserDetailsSchema.parse(await res.json());
};

const apiFetch = async (url: string, fetchOptions?: RequestInit) => {
  const requestUrl = new URL(url, backendApiConfig.baseUrl);

  try {
    return await fetch(requestUrl, {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOptions,
    });
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message ?? message;
    }

    throw new BackendApiConnectionError(message);
  }
};
