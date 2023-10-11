import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { Task } from "../apis/backend/types.ts";
import { useUserTasksQuery } from "../apis/backend/queries.ts";

export interface TaskDetailDialogProps {
  taskId: number | null;
  open: boolean;
  onClose: () => void;
}

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

  const showDueText = task.dueAt && task.completedAt == null;
  const showCompletedAtText = task.completedAt != null;

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box sx={{ paddingTop: "1rem" }}>
          <Stack spacing={3}>
            <Typography variant="h5">{task.displayName}</Typography>
            <Typography variant="body1">{task.description || "No Description"}</Typography>

            {showDueText && <Typography variant="body1">Due At: {task.dueAt}</Typography>}

            {showCompletedAtText && <Typography variant="body1">Completed At: {task.completedAt}</Typography>}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
