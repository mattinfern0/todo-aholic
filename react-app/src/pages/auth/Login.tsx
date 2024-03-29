import { Alert, Button, Card, CardContent, CardHeader, Container, Stack, TextField } from "@mui/material";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../integrations/firebase/mutations.ts";

interface LoginFormValues {
  email: string;
  password: string;
}

const loginFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginFormLayout = (props: { formContext: UseFormReturn<LoginFormValues> }) => {
  const { control } = props.formContext;

  return (
    <Stack spacing={3}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            required
            label="Email"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            type="password"
            label="Password"
          />
        )}
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
    resolver: zodResolver(loginFormValidationSchema),
  });

  const { handleSubmit } = loginFormContext;

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  });

  let errorMessage: string | null = null;

  if (loginMutation.isError) {
    console.error(loginMutation.error);
    if (loginMutation.error instanceof Error) {
      errorMessage = loginMutation.error.message;
    } else {
      errorMessage = "Unknown error";
    }
  }

  return (
    <Container maxWidth="md">
      <Helmet title="Login" />
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
