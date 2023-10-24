import { backendApiConfig } from "../../configs.ts";
import {
  ApiConnectionError,
  ApiError,
  CreateTaskArgs,
  CreateTaskListArgs,
  Task,
  TaskList,
  TaskListSchema,
  TaskSchema,
  UpdateTaskStatusArgs,
  UserDetails,
  UserDetailsSchema,
} from "./types.ts";
import { z } from "zod";
import { getIdToken } from "../firebase/firebaseApp.ts";

const buildDefaultOptions = async (): Promise<RequestInit> => {
  const bearerToken = await getIdToken();

  return {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    credentials: "include",
  };
};

export const login = async (email: string, password: string): Promise<UserDetails> => {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

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

  return UserDetailsSchema.parse(await res.json());
};

export const logout = async (): Promise<void> => {
  await apiFetch("/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUserDetails = async (): Promise<UserDetails> => {
  const res = await apiFetch("/users/me");

  return UserDetailsSchema.parse(await res.json());
};

export const getUserTasks = async (): Promise<Task[]> => {
  const res = await apiFetch("/tasks");

  const schema = z.array(TaskSchema);
  return schema.parse(await res.json());
};

export const getUserTaskLists = async (): Promise<TaskList[]> => {
  const res = await apiFetch("/task-lists");

  const schema = z.array(TaskListSchema);
  return schema.parse(await res.json());
};

export const createTaskList = async (createTaskListArgs: CreateTaskListArgs): Promise<TaskList> => {
  const res = await apiFetch("/task-lists", {
    method: "POST",
    body: JSON.stringify(createTaskListArgs),
  });

  return TaskListSchema.parse(await res.json());
};

export const createTask = async (createTaskArgs: CreateTaskArgs): Promise<Task> => {
  const res = await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(createTaskArgs),
  });

  return TaskSchema.parse(await res.json());
};

export const updateTaskStatus = async (args: UpdateTaskStatusArgs): Promise<void> => {
  await apiFetch(`/tasks/${args.taskId}/status`, {
    method: "PUT",
    body: JSON.stringify({
      isComplete: args.isComplete,
    }),
  });
};

const apiFetch = async (url: string, fetchOptions?: RequestInit) => {
  const requestUrl = new URL(url, backendApiConfig.baseUrl);

  let response: Response;
  try {
    response = await fetch(requestUrl, {
      ...(await buildDefaultOptions()),
      ...fetchOptions,
    });
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message ?? message;
    }

    throw new ApiConnectionError(message);
  }

  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  return response;
};
