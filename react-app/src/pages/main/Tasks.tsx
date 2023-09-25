import { Container, Typography } from "@mui/material";
import { TopAppBar } from "../../components/TopAppBar.tsx";

export const Tasks = () => {
  return (
    <>
      <TopAppBar />
      <Container>
        <Typography>Show tasks ehre</Typography>
      </Container>
    </>
  );
};
