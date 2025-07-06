import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../component/global/Theme";
import { Routes, Route } from "react-router-dom";
import HomePage from "../component/home/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
