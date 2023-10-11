import {
  Card,
  CardContent,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { TopAppBar } from "../../components/TopAppBar.tsx";
import { TaskList } from "../../components/TaskList.tsx";
import { CreateTaskForm } from "../../components/CreateTaskForm.tsx";
import { Add, MoreVertRounded } from "@mui/icons-material";
import { useUserTaskListsQuery, useUserTasksQuery } from "../../apis/backend/queries.ts";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { CreateTaskListDialog } from "../../components/CreateTaskListDialog.tsx";
import { Task } from "../../apis/backend/types.ts";
import { TaskDetailDialog } from "../../components/TaskDetailDialog.tsx";

const sidebarWidth = 400;

const DrawerSpacer = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const TaskListSideBar = (props: { handleNewTaskListClick: () => unknown }) => {
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
    <Drawer variant="persistent" anchor="left" open={true} sx={{ width: sidebarWidth, flexShrink: 0, zIndex: -1 }}>
      <DrawerSpacer />
      <List>
        <ListItemButton>
          <ListItemText primary="All Tasks" />
        </ListItemButton>
        {taskListNavItems}
        <ListItemButton onClick={() => props.handleNewTaskListClick()}>
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
  const [showCreateTaskListDialog, setShowCreateTaskListDialog] = useState<boolean>(false);
  const userTasksQuery = useUserTasksQuery();
  const [detailDialogTaskId, setDetailDialogTaskId] = useState<number | null>(null);

  const incompleteTasks: Task[] = userTasksQuery.data?.filter((t) => t.completedAt == null) ?? [];
  const completeTasks: Task[] = userTasksQuery.data?.filter((t) => t.completedAt != null) ?? [];

  const showCompletedTasksSection = completeTasks.length > 0;

  const onTaskListItemClick = (task: Task) => {
    setDetailDialogTaskId(task.id);
  };

  return (
    <SnackbarProvider>
      <TopAppBar />
      <TaskListSideBar handleNewTaskListClick={() => setShowCreateTaskListDialog(true)} />
      <CreateTaskListDialog open={showCreateTaskListDialog} onClose={() => setShowCreateTaskListDialog(false)} />
      <TaskDetailDialog
        taskId={detailDialogTaskId}
        open={detailDialogTaskId != null}
        onClose={() => setDetailDialogTaskId(null)}
      />
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
            <TaskList tasks={incompleteTasks} onTaskListItemClick={onTaskListItemClick} />
            {showCompletedTasksSection && (
              <>
                <Divider role="presentation">
                  <Typography variant="h5">Completed</Typography>
                </Divider>
                <TaskList tasks={completeTasks} onTaskListItemClick={onTaskListItemClick} />
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </SnackbarProvider>
  );
};
