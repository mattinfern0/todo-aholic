import { z, ZodError } from "zod";

export const UserDetailsSchema = z.object({
  id: z.number(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  ownerId: z.number(),
  taskListId: z.number().nullable(),
  displayName: z.string(),
  description: z.string().nullable(),
  completedAt: z.coerce.date().nullable(),
  dueAt: z.coerce.date().nullable(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskListSummarySchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  displayName: z.string(),
});

export type TaskListSummary = z.infer<typeof TaskListSummarySchema>;

export type CreateTaskArgs = {
  displayName: string;
  dueAt: Date | null;
};

export type UpdateTaskStatusArgs = {
  taskId: number;
  isComplete: boolean;
};

const ApiValidationErrorDetailItemSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export const ApiValidationErrorDetailSchema = z.object({
  global: z.array(ApiValidationErrorDetailItemSchema).optional().nullable(),
  fields: z.record(z.string(), z.array(ApiValidationErrorDetailItemSchema)).nullable().optional(),
});

export const ApiErrorResponseSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string(),

  validationErrors: ApiValidationErrorDetailSchema.optional().nullable(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export const isApiErrorResponse = (object: unknown): object is ApiErrorResponse => {
  return object != null && !(ApiValidationErrorDetailSchema.safeParse(object) instanceof ZodError);
};

export class ApiError extends Error {
  status: number = 500;
  response: Response | null = null;
  json: ApiErrorResponse | null = null;
  message: string = "Unknown error";

  constructor(message?: string) {
    super(message);
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    const result = new ApiError();
    result.response = response;
    result.status = response.status;
    result.message = response.statusText;

    try {
      const text = await response.text();
      const json: ApiErrorResponse = ApiErrorResponseSchema.parse(JSON.parse(text));

      result.message = json.detail;
      result.json = json;
    } catch (err: unknown) {
      console.error(err);
    }

    return result;
  }
}

export class ApiConnectionError extends Error {}
