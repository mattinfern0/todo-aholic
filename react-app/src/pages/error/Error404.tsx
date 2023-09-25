import { Container, Stack, Typography } from "@mui/material";

export const Error404 = () => {
  return (
    <Container>
      <Stack spacing={6} alignItems="center">
        <Typography variant="h1">404 - Page Not Found</Typography>
        <Typography variant="body1">How did you get here anyway?</Typography>
      </Stack>
    </Container>
  );
};
