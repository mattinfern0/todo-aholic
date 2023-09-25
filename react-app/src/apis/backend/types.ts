import { z } from "zod";

export const UserDetailsSchema = z.object({
  id: z.number(),
  email: z.string(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;

export class BackendApiConnectionError extends Error {}

export class BackendApiError extends Error {}
