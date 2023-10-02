import { useUserTasksQuery } from "../apis/backend/queries.ts";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

export const TaskList = () => {
  const userTasksQuery = useUserTasksQuery();

  const listItems =
    userTasksQuery.data?.map((task, index) => {
      const showDivider = index > 0;

      const secondaryText = task.dueAt ? `Due ${task.dueAt}` : null;

      return (
        <>
          {showDivider && <Divider />}
          <ListItem key={task.id}>
            <ListItemText primary={task.displayName} secondary={secondaryText} />
          </ListItem>
        </>
      );
    }) ?? [];

  return <List>{listItems}</List>;
};
