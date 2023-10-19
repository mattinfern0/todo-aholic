import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../integrations/backendApi/mutations.ts";
import { useSnackbar } from "notistack";

interface CreateTaskFormValues {
  display_name: string;
  dueDate: string;
}

export const CreateTaskForm = () => {
  const createTaskMutation = useCreateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm<CreateTaskFormValues>({
    defaultValues: {
      display_name: "",
      dueDate: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createTaskMutation.mutate(
      {
        displayName: data.display_name,
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
          <DatePicker label="Due Date" />
        </Grid>
        <Grid item md={2}>
          <Button startIcon={<Add />} variant="contained" type="submit" disabled={createTaskMutation.isLoading}>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
