import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
 } from "react-router-dom";
 import Consulta from "./Consulta/Consulta";
 
import Formulario from "./Formulario/Formulario";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: ["Noto Sans SC", '"Helvetica"', '"Arial"', '"sans-serif"'].join(","),
    },
    palette: {
        primary: {
            main: "#00695c",
            light: "#439889",
            dark: "#003d33",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#0097a7",
            light: "#56c8d8",
            dark: "#006978",
            contrastText: "#000000"
        },
        white: "#ffffff",
        grey: {
          dark: "#666666",
          light: "#f2f2f2"
        },
        contrastThreshold: 3,
    },
});
function App() {
  return (
    <ThemeProvider theme = {theme}>
    <Router>
        <Switch>
            <Route exact path="/">
                <Formulario/>
            </Route>
            <Route exact path="/consulta">
                <Consulta/>
            </Route>
        </Switch>
    </Router>
    </ThemeProvider>

  );
}
export default App;

