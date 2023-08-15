import { createTheme } from "@mui/material/styles";
export const Colors = {
  primary: "rgb(39,11,96)",
  secondary: "#938eef",
  background: "#fff",
  background2: "#efefef",
};
export const DarkColors = {
  primary: "rgb(39,11,96)",
  secondary: "#938eef",
  background: "#222",
  background2: "#333",
};
// primary: "rgb(39,11,96)",
// secondary: "#938eef",
// background: "rgb(193,190,255)",

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.background,
      paper: Colors.background2,
    },
    text: {
      primary: "#000",
      secondary: "#555",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 520,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {},
});
export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: DarkColors.primary,
    },
    secondary: {
      main: DarkColors.secondary,
    },
    background: {
      default: DarkColors.background,
      paper: DarkColors.background2,
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#D3D3D3",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 520,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {},
});
