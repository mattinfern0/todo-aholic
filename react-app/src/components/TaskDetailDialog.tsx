import { Box, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import { Task } from "../integrations/backendApi/types.ts";
import { useUserTasksQuery } from "../integrations/backendApi/queries.ts";
import { format } from "date-fns";
import { useDeleteTaskMutation } from "../integrations/backendApi/mutations.ts";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";

export interface TaskDetailDialogProps {
  taskId: string | null;
  open: boolean;
  onClose: () => void;
}

const formatDate = (d: Date): string => {
  return format(d, "h:mm a MMM d, yyyy");
};

export const TaskDetailDialog = (props: TaskDetailDialogProps) => {
  const { taskId } = props;
  const userTasksQuery = useUserTasksQuery();
  const deleteTaskMutation = useDeleteTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

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
          enqueueSnackbar("An error ocurred while deleting this task.", { variant: "error" });
        },
      },
    );
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <IconButton
        aria-label="close"
        onClick={onDeleteClick}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Delete />
      </IconButton>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};
