import React, { useState } from "react";
import NavBar from "../global/NavBar";
import ChatMessages from "./ChatMessages";
import SearchPage from "./SearchPage";
import CalendarPage from "./CalendarPage";
import SettingsPage from "./SettingsPage";
import MapPage from "./MapPage";
import { TripProvider } from "../context/TripContext";

import { Box, Slide } from "@mui/material";

const HomePage = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <TripProvider>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {activePage === "home" && <MapPage />}

          <Slide direction="left" in={activePage === "chat"} mountOnEnter unmountOnExit>
            <Box sx={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>
              <ChatMessages isOpen={true} onClose={() => setActivePage("home")} />
            </Box>
          </Slide>

          <Slide direction="right" in={activePage === "search"} mountOnEnter unmountOnExit>
            <Box sx={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>
              <SearchPage onClose={() => setActivePage("home")} />
            </Box>
          </Slide>

          <Slide direction="right" in={activePage === "calendar"} mountOnEnter unmountOnExit>
            <Box sx={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>
              <CalendarPage onClose={() => setActivePage("home")} goToMap={setActivePage} />
            </Box>
          </Slide>

          <Slide direction="left" in={activePage === "settings"} mountOnEnter unmountOnExit>
            <Box sx={{ position: "absolute", top: 0, width: "100%", height: "100%" }}>
              <SettingsPage onClose={() => setActivePage("home")} />
            </Box>
          </Slide>
        </Box>

        <NavBar onNavigate={setActivePage} />
      </Box>
    </TripProvider>
  );
};

export default HomePage;
