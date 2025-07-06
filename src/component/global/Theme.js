// src/theme.js
import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins"; // Moderne
import "@fontsource/roboto-slab"; // Titres élégants

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F9FAFB",     // Très clair
      paper: "#FFFFFF",       // Blanc pur
    },
    text: {
      primary: "#1F2937",     // Bleu-gris très foncé (quasi noir)
      secondary: "#6B7280",   // Gris doux moderne
    },
    primary: {
      main: "#0F62FE",        // Bleu IBM / moderne & professionnel
    },
    secondary: {
      main: "#6C63FF",        // Bleu-violet doux pour l'accentuation
    },
    accent: {
      main: "#FF6B6B",        // Rouge doux (si besoin ponctuel)
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
    h1: {
      fontFamily: "'Roboto Slab', serif",
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#1F2937",
    },
    h2: {
      fontFamily: "'Roboto Slab', serif",
      fontSize: "2rem",
      fontWeight: 600,
      color: "#0F62FE",
    },
    body1: {
      fontSize: "1rem",
      color: "#1F2937",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0F62FE",
          color: "#FFFFFF",
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#0052CC",
          },
        },
      },
    },
  },
});

export { theme };
