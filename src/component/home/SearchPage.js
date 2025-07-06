// src/component/home/SearchPage.js

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Link,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import activites from "../../data/activites";
import { useTripContext } from "../context/TripContext";

const SearchPage = ({ onClose, goToMap }) => {
  const { setSelectedActivity } = useTripContext();

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    if (goToMap) goToMap("home");
    if (onClose) onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.default",
        padding: 3,
        overflowY: "scroll",
      }}
    >
      <IconButton onClick={onClose} sx={{ position: "absolute", top: 20, right: 20 }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5 }}>
        Activités à venir
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {activites.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                padding: 2,
                borderRadius: 3,
                transition: "0.3s",
                ":hover": { transform: "scale(1.03)", boxShadow: 6 },
              }}
            >
              <Typography variant="h6" gutterBottom>
                {activity.lieu}
              </Typography>

              {activity.noms.map((nom, i) => (
                <Typography key={i} variant="body1" sx={{ ml: 1 }}>
                  • {nom}
                </Typography>
              ))}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Tooltip title="Voir sur la carte">
                  <PlaceIcon
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => handleActivityClick(activity)}
                  />
                </Tooltip>

                {activity.lien && (
                  <Link href={activity.lien} target="_blank" rel="noopener" underline="hover">
                    Voir l’activité
                  </Link>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
