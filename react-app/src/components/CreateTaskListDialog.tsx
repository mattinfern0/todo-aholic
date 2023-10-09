import { Controller, useForm } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";

interface CreateTaskListFormValues {
  name: string;
}

export interface CreateTaskListDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateTaskListDialog = (props: CreateTaskListDialogProps) => {
  const { control, handleSubmit, reset } = useForm<CreateTaskListFormValues>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    reset();
  }, [reset, props.open]);

  const formId = "create-task-list";

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>New Task List</DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: "1rem" }}>
          <form id={formId} onSubmit={onSubmit}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <TextField {...field} label="Name" required fullWidth />}
            />
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button type="submit" form={formId}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
