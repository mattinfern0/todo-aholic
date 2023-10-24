import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Chip,
  Container,
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
import { Add, ExpandMoreRounded, MoreVertRounded } from "@mui/icons-material";
import { useUserTaskListsQuery, useUserTasksQuery } from "../../integrations/backendApi/queries.ts";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { CreateTaskListDialog } from "../../components/CreateTaskListDialog.tsx";
import { Task, TaskList as TaskListType } from "../../integrations/backendApi/types.ts";
import { TaskDetailDialog } from "../../components/TaskDetailDialog.tsx";

const sidebarWidth = 400;

const DrawerSpacer = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

interface TaskListSideBarProps {
  handleNewTaskListClick: () => void;
  handleAllTaskListsClick: () => void;
  handleTaskListItemClick: (taskList: TaskListType) => void;
}

const TaskListSideBar = (props: TaskListSideBarProps) => {
  const userTaskListsQuery = useUserTaskListsQuery();

  const taskListNavItems =
    userTaskListsQuery.data?.map((taskList) => {
      return (
        <ListItemButton key={taskList.id} onClick={() => props.handleTaskListItemClick(taskList)}>
          <ListItemText primary={taskList.displayName} />
        </ListItemButton>
      );
    }) ?? [];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{ width: sidebarWidth, flexShrink: 0, zIndex: -1 }}
      PaperProps={{
        sx: {
          backgroundColor: "#5e5e5e",
          color: "#fff",
        },
      }}
    >
      <DrawerSpacer />
      <List>
        <ListItemButton onClick={props.handleAllTaskListsClick}>
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
  const [currentTaskListId, setCurrentTaskListId] = useState<string | null>(null);
  const [showCreateTaskListDialog, setShowCreateTaskListDialog] = useState<boolean>(false);
  const userTasksQuery = useUserTasksQuery();
  const userTaskListsQuery = useUserTaskListsQuery();
  const [detailDialogTaskId, setDetailDialogTaskId] = useState<string | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);

  let displayTaskList = null;
  const displayTasks = userTasksQuery.data?.filter((t) => t.taskListId === currentTaskListId) ?? [];

  if (currentTaskListId != null) {
    displayTaskList = userTaskListsQuery.data?.find((l) => l.id === currentTaskListId) ?? null;
  }
  const incompleteTasks: Task[] = displayTasks.filter((t) => t.completedAt == null) ?? [];
  const completeTasks: Task[] = displayTasks.filter((t) => t.completedAt != null) ?? [];

  const showCompletedTasksSection = completeTasks.length > 0;

  const onTaskListItemClick = (task: Task) => {
    setDetailDialogTaskId(task.id);
    setShowDetailDialog(true);
  };

  const listTitle = displayTaskList?.displayName ?? "All Tasks";

  return (
    <SnackbarProvider>
      <TopAppBar />
      <TaskListSideBar
        handleNewTaskListClick={() => setShowCreateTaskListDialog(true)}
        handleAllTaskListsClick={() => setCurrentTaskListId(null)}
        handleTaskListItemClick={(taskList) => setCurrentTaskListId(taskList.id)}
      />
      <CreateTaskListDialog
        open={showCreateTaskListDialog}
        onClose={() => setShowCreateTaskListDialog(false)}
        onTaskListCreate={async (newList) => {
          setCurrentTaskListId(newList.id);
          setShowCreateTaskListDialog(false);
        }}
      />
      <TaskDetailDialog
        taskId={detailDialogTaskId}
        open={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
      />
      <Container sx={{ paddingTop: "1rem" }}>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignContent="baseline">
              <Typography variant="h5" mb="1rem">
                {listTitle}
              </Typography>

              <IconButton>
                <MoreVertRounded />
              </IconButton>
            </Stack>

            <CreateTaskForm currentTaskListId={currentTaskListId} />
            <TaskList tasks={incompleteTasks} onTaskListItemClick={onTaskListItemClick} />
            {showCompletedTasksSection && (
              <>
                <Accordion disableGutters elevation={0}>
                  <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                    <Stack direction="row" spacing={3} alignContent="center">
                      <Typography variant="h5">Completed</Typography>
                      <Chip
                        color="secondary"
                        label={completeTasks.length}
                        style={{ fontWeight: "bold", fontSize: "1em" }}
                      />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <TaskList tasks={completeTasks} onTaskListItemClick={onTaskListItemClick} />
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </SnackbarProvider>
  );
};
