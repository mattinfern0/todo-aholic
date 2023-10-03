import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";

interface CreateTaskFormValues {
  display_name: string;
  dueDate: string;
}

export const CreateTaskForm = () => {
  const { control, handleSubmit } = useForm<CreateTaskFormValues>({
    defaultValues: {
      display_name: "",
      dueDate: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Controller
            control={control}
            name="display_name"
            render={({ field }) => (
              <TextField {...field} fullWidth placeholder="What do you want to do?" size="small" required />
            )}
          />
        </Grid>
        <Grid item>
          <DatePicker label="Due Date" slotProps={{ textField: { size: "small" } }} />
        </Grid>
        <Grid item md={2}>
          <Button startIcon={<Add />} variant="contained" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
