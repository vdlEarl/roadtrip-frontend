// src/component/home/SettingsPage.js

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SettingsPage = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 20, right: 20 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" color="text.secondary" align="center">
        Coming soon...
      </Typography>
    </Box>
  );
};

export default SettingsPage;
