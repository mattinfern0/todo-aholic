import React from "react";
import { Checkbox, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Task } from "../integrations/backendApi/types.ts";
import { useUpdateTaskStatusMutation } from "../integrations/backendApi/mutations.ts";
import { useSnackbar } from "notistack";

export interface TaskListProps {
  tasks: Task[];
  onTaskListItemClick: (task: Task) => void;
}

const TaskListItem = (props: { task: Task; onTaskListItemClick: (task: Task) => void }) => {
  const { task, onTaskListItemClick } = props;

  const updateTaskStatusMutation = useUpdateTaskStatusMutation();
  const snackbar = useSnackbar();

  const isTaskComplete = task.completedAt != null;
  const secondaryText = !isTaskComplete && task.dueAt ? `Due ${task.dueAt}` : null;

  const onCheckBoxClick = () => {
    if (updateTaskStatusMutation.isPending) {
      return;
    }

    updateTaskStatusMutation.mutate(
      {
        taskId: task.id,
        isComplete: !isTaskComplete,
      },
      {
        onError: (err: unknown) => {
          console.error(err);
          snackbar.enqueueSnackbar("An error occurred.", { variant: "error" });
        },
      },
    );
  };

  const isOverdue = !isTaskComplete && task.dueAt != null && new Date(task.dueAt) < new Date();

  return (
    <ListItemButton alignItems="center">
      <Checkbox checked={isTaskComplete} onClick={onCheckBoxClick} />
      <ListItemText
        onClick={() => onTaskListItemClick(task)}
        primary={task.displayName}
        secondary={secondaryText}
        primaryTypographyProps={{
          color: isOverdue ? "red" : undefined,
        }}
      />
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
          <TaskListItem task={task} onTaskListItemClick={props.onTaskListItemClick} />
        </React.Fragment>
      );
    }) ?? [];

  return <List>{listItems}</List>;
};
