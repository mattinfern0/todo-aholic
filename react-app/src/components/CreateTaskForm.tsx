import { Button, Grid, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../integrations/backendApi/mutations.ts";
import { useSnackbar } from "notistack";

interface CreateTaskFormValues {
  display_name: string;
  due_at: Date | null;
}

export const CreateTaskForm = () => {
  const createTaskMutation = useCreateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm<CreateTaskFormValues>({
    defaultValues: {
      display_name: "",
      due_at: null,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createTaskMutation.mutate(
      {
        displayName: data.display_name,
        dueAt: data.due_at,
      },
      {
        onSuccess: () => {
          enqueueSnackbar("Task created", { variant: "success" });
          reset();
        },
        onError: (error: unknown) => {
          console.error(error);

          if (error instanceof Error) {
            console.log(error.message);
          }
        },
      },
    );
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Controller
            control={control}
            name="display_name"
            render={({ field }) => <TextField {...field} fullWidth placeholder="What do you want to do?" required />}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="due_at"
            render={({ field }) => <DateTimePicker label="Due At" {...field} />}
          />
        </Grid>
        <Grid item md={2}>
          <Button startIcon={<Add />} variant="contained" type="submit" disabled={createTaskMutation.isPending}>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
