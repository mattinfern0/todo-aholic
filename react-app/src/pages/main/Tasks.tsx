import {
  Card,
  CardContent,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { TopAppBar } from "../../components/TopAppBar.tsx";
import { TaskList } from "../../components/TaskList.tsx";
import { CreateTaskForm } from "../../components/CreateTaskForm.tsx";
import { Add, MoreVertRounded } from "@mui/icons-material";
import { useUserTaskListsQuery } from "../../apis/backend/queries.ts";

const sidebarWidth = 400;

const TaskListSideBar = () => {
  const userTaskListsQuery = useUserTaskListsQuery();

  const taskListNavItems =
    userTaskListsQuery.data?.map((taskList) => {
      return (
        <ListItemButton key={taskList.id}>
          <ListItemText primary={taskList.displayName} />
        </ListItemButton>
      );
    }) ?? [];

  return (
    <Drawer variant="persistent" anchor="left" open={true} sx={{ width: sidebarWidth, flexShrink: 0 }}>
      <List>
        <ListItemButton>
          <ListItemText primary="All Tasks" />
        </ListItemButton>
        {taskListNavItems}
        <ListItemButton>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="New List" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export const Tasks = () => {
  return (
    <>
      <TopAppBar />
      <TaskListSideBar />
      <Container sx={{ paddingTop: "1rem" }}>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignContent="baseline">
              <Typography variant="h5" mb="1rem">
                All Tasks
              </Typography>

              <IconButton>
                <MoreVertRounded />
              </IconButton>
            </Stack>

            <CreateTaskForm />
            <TaskList />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
