import { Container, Stack, Typography } from "@mui/material";

export const Error404 = () => {
  return (
    <Container>
      <Stack spacing={6} alignItems="center">
        <Typography variant="h1">503 - Service Unavailable</Typography>
        <Typography variant="body1">
          It looks like the server is currently unavailable. Please come back later.
        </Typography>
      </Stack>
    </Container>
  );
};
