import { Card, CardContent, CardHeader, Container } from "@mui/material";
import { TopAppBar } from "../../components/TopAppBar.tsx";
import { TaskList } from "../../components/TaskList.tsx";

export const Tasks = () => {
  return (
    <>
      <TopAppBar />
      <Container>
        <Card>
          <CardHeader>Tasks</CardHeader>
          <CardContent>
            <TaskList />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
