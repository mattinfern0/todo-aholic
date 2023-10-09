import React from "react";
import { useUserTasksQuery } from "../apis/backend/queries.ts";
import { Checkbox, Divider, List, ListItemButton, ListItemText } from "@mui/material";

export const TaskList = () => {
  const userTasksQuery = useUserTasksQuery();

  const sortedTasks = userTasksQuery.data?.sort((a, b) => a.displayName.localeCompare(b.displayName)) ?? [];

  const listItems =
    sortedTasks.map((task, index) => {
      const showDivider = index > 0;

      const secondaryText = task.dueAt ? `Due ${task.dueAt}` : null;

      return (
        <React.Fragment key={task.id}>
          {showDivider && <Divider />}
          <ListItemButton>
            <Checkbox checked={task.dueAt != null} />
            <ListItemText primary={task.displayName} secondary={secondaryText} />
          </ListItemButton>
        </React.Fragment>
      );
    }) ?? [];

  return <List>{listItems}</List>;
};
