import { Alert, Button, Card, CardContent, CardHeader, Container, Stack, TextField } from "@mui/material";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { useLoginMutation } from "../../apis/backend/mutations.ts";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginFormLayout = (props: { formContext: UseFormReturn<LoginFormValues> }) => {
  const { control } = props.formContext;

  return (
    <Stack spacing={3}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => <TextField {...field} required label="Email" />}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => <TextField {...field} required type="password" label="Password" />}
      />
    </Stack>
  );
};

export const Login = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const loginFormContext = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = loginFormContext;

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(
      {
        ...data,
      },
      {
        onSuccess: (data) => {
          navigate("/");
        },
      },
    );
  });

  let errorMessage: string | null = null;

  if (loginMutation.isError) {
    if (loginMutation.error instanceof Error) {
      errorMessage = loginMutation.error.message;
    } else {
      errorMessage = "Unknown error";
    }
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <Stack spacing={6}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <form onSubmit={onSubmit}>
              <Stack spacing={3}>
                <LoginFormLayout formContext={loginFormContext} />
                <Button type="submit" variant="contained" fullWidth>
                  Log In
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};
