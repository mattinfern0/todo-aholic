import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet titleTemplate="%s - Todoaholic" defaultTitle="Todoaholic" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
