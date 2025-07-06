import React from "react";
import itineraire from "../../data/itineraire";
import {
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { useTripContext } from "../context/TripContext";

const CalendarPage = ({ onClose, goToMap }) => {
  const { setSelectedStep } = useTripContext();

  const handleEtapeClick = (etape) => {
    setSelectedStep(etape);        // enregistre l'étape sélectionnée
    if (goToMap) goToMap("home");  // affiche MapPage via setActivePage("home")
    if (onClose) onClose();        // ferme la slide
  };

  return (
    <Box sx={{ px: 2, pt: 4, pb: 8,height: "100%",overflowY: "auto", }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
        Itinéraire du Roadtrip
      </Typography>

      <Stack spacing={3}>
        {itineraire.map((etape, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => handleEtapeClick(etape)}
          >
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}
            >
              {etape.jour} – {etape.date}
            </Typography>

            <Box
              sx={{
                pl: 2,
                borderLeft: "2px dashed",
                borderColor: "primary.main",
              }}
            >
              {etape.etapes.map((ville, i) => (
                <Typography key={i} sx={{ mb: 1 }}>
                  • {ville.name}
                </Typography>
              ))}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default CalendarPage;
