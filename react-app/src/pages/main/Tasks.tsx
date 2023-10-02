import { Card, CardContent, Container, IconButton, Stack, Typography } from "@mui/material";
import { TopAppBar } from "../../components/TopAppBar.tsx";
import { TaskList } from "../../components/TaskList.tsx";
import { CreateTaskForm } from "../../components/CreateTaskForm.tsx";
import { MoreVertRounded } from "@mui/icons-material";

export const Tasks = () => {
  return (
    <>
      <TopAppBar />
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
