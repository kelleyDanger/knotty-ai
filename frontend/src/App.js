import React from "react";
import QueryForm from "./QueryForm";
import { Box, Typography } from "@mui/material";
import logo from './assets/logo.png';


function App() {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <img
        src={logo}
        alt="Knotty AI Logo"
        style={{ width: "50%", marginBottom: "1rem" }}
      />
      <Typography variant="h4" gutterBottom>
        Welcome to Knotty AI
      </Typography>
      <QueryForm />
    </Box>
  );
}

export default App;
