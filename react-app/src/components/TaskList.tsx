import React from "react";
import { Checkbox, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Task } from "../apis/backend/types.ts";
import { useUpdateTaskStatusMutation } from "../apis/backend/mutations.ts";
import { useSnackbar } from "notistack";

export interface TaskListProps {
  tasks: Task[];
}

const TaskListItem = (props: { task: Task }) => {
  const { task } = props;

  const updateTaskStatusMutation = useUpdateTaskStatusMutation();
  const snackbar = useSnackbar();
  const secondaryText = task.dueAt ? `Due ${task.dueAt}` : null;

  const isTaskComplete = task.completedAt != null;

  const onCheckBoxClick = () => {
    if (updateTaskStatusMutation.isLoading) {
      return;
    }

    updateTaskStatusMutation.mutate(
      {
        taskId: task.id,
        isComplete: !isTaskComplete,
      },
      {
        onError: (_err: unknown) => {
          snackbar.enqueueSnackbar("An error occurred.", { variant: "error" });
        },
      },
    );
  };

  return (
    <ListItemButton>
      <Checkbox checked={isTaskComplete} onClick={onCheckBoxClick} />
      <ListItemText primary={task.displayName} secondary={secondaryText} />
    </ListItemButton>
  );
};

export const TaskList = (props: TaskListProps) => {
  const sortedTasks = props.tasks.sort((a, b) => a.displayName.localeCompare(b.displayName)) ?? [];

  const listItems =
    sortedTasks.map((task, index) => {
      const showDivider = index > 0;

      return (
        <React.Fragment key={task.id}>
          {showDivider && <Divider />}
          <TaskListItem task={task} />
        </React.Fragment>
      );
    }) ?? [];

  return <List>{listItems}</List>;
};
