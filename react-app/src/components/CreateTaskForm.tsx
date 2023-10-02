import { Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";

export const CreateTaskForm = () => {
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField fullWidth placeholder="What do you want to do?" size="small" />
        </Grid>
        <Grid item>
          <DatePicker label="Due Date" slotProps={{ textField: { size: "small" } }} />
        </Grid>
        <Grid item md={2}>
          <Button startIcon={<Add />} variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
