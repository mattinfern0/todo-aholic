import React from "react";
import { useUserTasksQuery } from "../apis/backend/queries.ts";
import { Divider, List, ListItemButton, ListItemText } from "@mui/material";

export const TaskList = () => {
  const userTasksQuery = useUserTasksQuery();

  const listItems =
    userTasksQuery.data?.map((task, index) => {
      const showDivider = index > 0;

      const secondaryText = task.dueAt ? `Due ${task.dueAt}` : null;

      return (
        <React.Fragment key={task.id}>
          {showDivider && <Divider />}
          <ListItemButton>
            <ListItemText primary={task.displayName} secondary={secondaryText} />
          </ListItemButton>
        </React.Fragment>
      );
    }) ?? [];

  return <List>{listItems}</List>;
};
