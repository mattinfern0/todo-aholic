import { Box, Button, Dialog, DialogContent, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Task } from "../integrations/backendApi/types.ts";
import { useUserTasksQuery } from "../integrations/backendApi/queries.ts";
import { format } from "date-fns";
import { useDeleteTaskMutation } from "../integrations/backendApi/mutations.ts";
import { Delete, Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";

export interface TaskDetailDialogProps {
  taskId: string | null;
  open: boolean;
  onClose: () => void;
}

const formatDate = (d: Date): string => {
  return format(d, "h:mm a MMM d, yyyy");
};

const TaskDetailReadLayout = (props: { task: Task; onEditClick: () => void; onDeleteClick: () => void }) => {
  const { task } = props;
  return (
    <>
      <Stack direction="row-reverse">
        <IconButton aria-label="delete" onClick={props.onDeleteClick}>
          <Delete />
        </IconButton>
        <IconButton aria-label="edit" onClick={props.onEditClick}>
          <Edit />
        </IconButton>
      </Stack>
      <Box sx={{ paddingTop: "1rem" }}>
        <Stack spacing={3}>
          <Typography variant="h5">{task.displayName}</Typography>
          <Typography variant="body1">{task.description || "No Description"}</Typography>

          {task.dueAt != null && task.completedAt == null && (
            <Typography variant="body1">Due At: {formatDate(task.dueAt)}</Typography>
          )}

          {task.completedAt != null && (
            <Typography variant="body1">Completed At: {formatDate(task.completedAt)}</Typography>
          )}
        </Stack>
      </Box>
    </>
  );
};

interface EditTaskFormValues {
  display_name: string;
  description: string;
  due_at: Date | null;
  completed: boolean;
}

const TaskEditLayout = (props: { task: Task; handleClose: () => void }) => {
  const { task } = props;
  const { control, handleSubmit } = useForm<EditTaskFormValues>({
    defaultValues: {
      display_name: task.displayName,
      description: task.description || "",
      due_at: task.dueAt,
      completed: task.completedAt != null,
    },
  });

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data);
      props.handleClose();

      task.description = data.description;
      task.displayName = data.display_name;
      task.dueAt = data.due_at;
    },
    (errors) => console.log(errors),
  );

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ paddingTop: "1rem" }}>
        <Stack spacing={3}>
          <Controller
            control={control}
            name="display_name"
            render={({ field }) => <TextField {...field} fullWidth label="Title" required />}
          />
          <Grid item>
            <Controller
              control={control}
              name="due_at"
              render={({ field }) => <DateTimePicker label="Due At" {...field} />}
            />
          </Grid>
          <Controller
            control={control}
            name="description"
            render={({ field }) => <TextField {...field} fullWidth label="Description" multiline minRows={3} />}
          />
          <Stack direction="row" justifyContent="space-between">
            <Button color="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export const TaskDetailDialog = (props: TaskDetailDialogProps) => {
  const { taskId } = props;
  const userTasksQuery = useUserTasksQuery();
  const deleteTaskMutation = useDeleteTaskMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [showEditMode, setShowEditMode] = useState(false);

  if (taskId == null) {
    return null;
  }

  const task: Task | null = userTasksQuery.data?.find((t) => t.id === taskId) ?? null;

  if (task == null) {
    return null;
  }

  const onDeleteClick = () => {
    if (deleteTaskMutation.isPending) {
      return;
    }

    deleteTaskMutation.mutate(
      { taskId: taskId },
      {
        onSuccess: () => {
          props.onClose();
          enqueueSnackbar("Task deleted!", { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar("An error occurred while deleting this task.", { variant: "error" });
        },
      },
    );
  };

  const onClose = () => {
    if (showEditMode) {
      return;
    }

    props.onClose();
    setShowEditMode(false);
  };

  return (
    <Dialog open={props.open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        {!showEditMode && (
          <TaskDetailReadLayout task={task} onDeleteClick={onDeleteClick} onEditClick={() => setShowEditMode(true)} />
        )}
        {showEditMode && <TaskEditLayout task={task} handleClose={() => setShowEditMode(false)} />}
      </DialogContent>
    </Dialog>
  );
};
