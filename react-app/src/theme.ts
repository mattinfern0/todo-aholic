import { createTheme } from "@mui/material";

const textFieldBorderRadius = "9px";

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
        InputProps: {
          style: {
            borderRadius: textFieldBorderRadius,
          },
        },
      },
    },
    // TODO apply border-radius to datepicker
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: "#e0670f",
    },
    secondary: {
      main: "#656565",
    },
    background: {
      default: "#eeeeee",
    },
  },
});
