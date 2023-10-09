import { backendApiConfig } from "../../configs.ts";
import {
  BackendApiConnectionError,
  BackendApiError,
  CreateTaskArgs,
  Task,
  TaskListSummary,
  TaskListSummarySchema,
  TaskSchema,
  UserDetails,
  UserDetailsSchema,
} from "./types.ts";
import { z } from "zod";

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "include",
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

export const signUp = async (email: string, password: string): Promise<UserDetails> => {
  const res = await apiFetch("/users", {
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

export const getUserTasks = async (): Promise<Task[]> => {
  const res = await apiFetch("/tasks");

  if (!res.ok) {
    throw new BackendApiError();
  }

  const schema = z.array(TaskSchema);
  return schema.parse(await res.json());
};

export const getUserTaskLists = async (): Promise<TaskListSummary[]> => {
  const res = await apiFetch("/task-lists");

  if (!res.ok) {
    throw new BackendApiError();
  }

  const schema = z.array(TaskListSummarySchema);
  return schema.parse(await res.json());
};

export const createTask = async (createTaskArgs: CreateTaskArgs): Promise<Task> => {
  const res = await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(createTaskArgs),
  });

  if (!res.ok) {
    throw new BackendApiError();
  }

  return TaskSchema.parse(await res.json());
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
