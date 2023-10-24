import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { Task } from "../integrations/backendApi/types.ts";
import { useUserTasksQuery } from "../integrations/backendApi/queries.ts";
import { format } from "date-fns";

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

  if (taskId == null) {
    return null;
  }

  const task: Task | null = userTasksQuery.data?.find((t) => t.id === taskId) ?? null;

  if (task == null) {
    return null;
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
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
