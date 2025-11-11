import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.2)", // elevation=1
    ...Array(23).fill("none"), // заполняем остальные
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});