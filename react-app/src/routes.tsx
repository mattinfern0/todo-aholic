import { RouteObject } from "react-router-dom";
import { Login } from "./pages/auth/Login.tsx";
import { Error404 } from "./pages/error/Error404.tsx";
import { Tasks } from "./pages/main/Tasks.tsx";
import { LoginRequiredGuard } from "./components/LoginRequiredGuard.tsx";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <LoginRequiredGuard>
        <Tasks />
      </LoginRequiredGuard>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
