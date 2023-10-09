import { z } from "zod";

export const UserDetailsSchema = z.object({
  id: z.number(),
  email: z.string(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;

export const TaskSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  taskListId: z.number().nullable(),
  displayName: z.string().nullable(),
  description: z.string().nullable(),
  completedAt: z.string().nullable(),
  dueAt: z.string().nullable(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskListSummarySchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  displayName: z.string(),
});

export type TaskListSummary = z.infer<typeof TaskListSummarySchema>;

export class BackendApiConnectionError extends Error {}

export class BackendApiError extends Error {}

export type CreateTaskArgs = {
  displayName: string;
  dueAt?: string;
};
