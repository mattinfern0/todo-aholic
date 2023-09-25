import { Button, Card, CardContent, CardHeader, Container, Stack, TextField } from "@mui/material";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { useLoginMutation } from "../../apis/backend/mutations.ts";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loginMutation = useLoginMutation();
  const loginFormContext = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = loginFormContext;

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate({
      ...data,
    });
  });

  return (
    <Container>
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              <LoginFormLayout formContext={loginFormContext} />
              <Button type="submit" variant="contained" fullWidth>
                Log In
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
