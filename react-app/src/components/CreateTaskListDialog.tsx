import { Controller, useForm } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";
import { useCreateTaskListMutation } from "../integrations/backendApi/mutations.ts";
import { TaskList } from "../integrations/backendApi/types.ts";
import { useSnackbar } from "notistack";

interface CreateTaskListFormValues {
  name: string;
}

export interface CreateTaskListDialogProps {
  open: boolean;
  onClose: () => void;
  onTaskListCreate?: (newList: TaskList) => void;
}

export const CreateTaskListDialog = (props: CreateTaskListDialogProps) => {
  const createTaskListMutation = useCreateTaskListMutation();
  const snackbar = useSnackbar();
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
    createTaskListMutation.mutate(
      { displayName: data.name },
      {
        onSuccess: (data) => {
          reset();

          snackbar.enqueueSnackbar("List created", { variant: "success" });

          if (props.onTaskListCreate != undefined && data != null) {
            props.onTaskListCreate(data);
          }
        },
        onError: (error: unknown) => {
          console.error(error);

          snackbar.enqueueSnackbar("An error occurred while creating this list", { variant: "error" });
        },
      },
    );
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
