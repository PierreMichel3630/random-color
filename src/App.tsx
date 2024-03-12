import { BrowserRouter } from "react-router-dom";
import "./i18n/config";

import Routes from "./routes";
import { GlobalProvider } from "./context/GlobalProvider";
import { deepPurple } from "@mui/material/colors";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: deepPurple[700],
      },
      secondary: {
        main: "#ffffff",
      },
      text: {
        primary: deepPurple[700],
        secondary: "#5f748d",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      h1: {
        fontFamily: ["Bowlby One SC", "sans-serif"].join(","),
        fontSize: 50,
        fontWeight: 700,
        "@media (max-width:600px)": {
          fontSize: 40,
        },
      },
      h2: {
        fontFamily: ["Bowlby One SC", "sans-serif"].join(","),
        fontSize: 35,
        fontWeight: 700,
        "@media (max-width:600px)": {
          fontSize: 25,
        },
      },
      caption: {
        fontSize: 10,
        fontStyle: "italic",
        fontWeight: 500,
        "@media (max-width:600px)": {
          fontSize: 10,
        },
      },
      body1: {
        fontSize: 13,
        fontWeight: 500,
        "@media (max-width:600px)": {
          fontSize: 12,
        },
      },
      body2: {
        fontSize: 11,
        fontWeight: 700,
        "@media (max-width:600px)": {
          fontSize: 11,
        },
      },
      h3: {
        fontSize: 18,
        fontWeight: 700,
        "@media (max-width:600px)": {
          fontSize: 15,
        },
      },
      h4: {
        fontSize: 16,
        fontWeight: 700,
        "@media (max-width:600px)": {
          fontSize: 14,
        },
      },
      h6: {
        fontSize: 13,
        fontWeight: 600,
        "@media (max-width:600px)": {
          fontSize: 12,
        },
      },
    },
  });

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
