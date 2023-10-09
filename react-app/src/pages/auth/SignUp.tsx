import { Alert, Button, Card, CardContent, CardHeader, Container, Stack, TextField } from "@mui/material";
import { useSignUpMutation } from "../../apis/backend/mutations.ts";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";

interface SignUpFormValues {
  email: string;
  password_1: string;
  password_2: string;
}

const signUpFormValidationSchema = z
  .object({
    email: z.string().email(),
    password_1: z.string(),
    password_2: z.string(),
  })
  .refine((data) => data.password_1 === data.password_2, {
    message: "Passwords don't match",
    path: ["password_2"],
  });

const SignUpFormLayout = (props: { formContext: UseFormReturn<SignUpFormValues> }) => {
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
        name="password_1"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            required
            type="password"
            label="Password"
          />
        )}
      />
      <Controller
        control={control}
        name="password_2"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            required
            type="password"
            label="Confirm Password"
          />
        )}
      />
    </Stack>
  );
};

export const SignUp = () => {
  const signUpMutation = useSignUpMutation();

  const signUpFormContext = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password_1: "",
      password_2: "",
    },
    resolver: zodResolver(signUpFormValidationSchema),
  });

  const { handleSubmit } = signUpFormContext;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  let errorMessage: string | null = null;

  if (signUpMutation.isError) {
    if (signUpMutation.error instanceof Error) {
      errorMessage = signUpMutation.error.message;
    } else {
      errorMessage = "Unknown error";
    }
  }

  return (
    <Container maxWidth="md">
      <Helmet title="Sign Up" />
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <Stack spacing={6}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <form onSubmit={onSubmit}>
              <Stack spacing={3}>
                <SignUpFormLayout formContext={signUpFormContext} />
                <Button type="submit" variant="contained" fullWidth>
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};
