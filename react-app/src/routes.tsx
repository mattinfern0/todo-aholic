import { RouteObject } from "react-router-dom";
import { Login } from "./pages/auth/Login.tsx";
import { Error404 } from "./pages/error/Error404.tsx";
import { Tasks } from "./pages/main/Tasks.tsx";
import { LoginRequiredGuard } from "./components/LoginRequiredGuard.tsx";
import { SignUp } from "./pages/auth/SignUp.tsx";
import { AppErrorBoundary } from "./components/AppErrorBoundary.tsx";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <AppErrorBoundary>
        <LoginRequiredGuard>
          <Tasks />
        </LoginRequiredGuard>
      </AppErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
