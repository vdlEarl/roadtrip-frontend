// component/home/MapPage.js
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useTripContext } from "../context/TripContext";
import { Fab } from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import DirectionsIcon from "@mui/icons-material/Directions";
import itineraire from "../../data/itineraire";

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ4ZjEzNGU3YjNmODRlOTg4NTMxYzZiNTk1MzliNzhlIiwiaCI6Im11cm11cjY0In0=";

const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FollowUserControl = ({ followUser }) => {
  const map = useMap();

  useEffect(() => {
    if (!followUser) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        map.setView(coords, map.getZoom());
      },
      (err) => console.error("Erreur suivi :", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [followUser, map]);

  return null;
};

const MapPage = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [stepRoute, setStepRoute] = useState([]);
  const [routeToStep, setRouteToStep] = useState([]);
  const [fullRoute, setFullRoute] = useState([]);
  const [followUser, setFollowUser] = useState(false);
  const { selectedStep, selectedActivity } = useTripContext();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserPosition(coords);
      },
      (err) => {
        console.error("Erreur GPS:", err);
        alert("La géolocalisation est nécessaire pour afficher l'itinéraire depuis ta position.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const generateStepRoute = async () => {
      if (!selectedStep || selectedStep.etapes.length < 2) return;

      const coords = selectedStep.etapes.map((v) => [v.coords[1], v.coords[0]]);
      try {
        const res = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          { coordinates: coords },
          {
            headers: {
              Authorization: ORS_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const route = res.data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        setStepRoute(route);
        setFullRoute([]); // reset full route
      } catch (e) {
        console.error("Erreur ORS étape :", e);
      }
    };

    const generateRouteToClosestVille = async () => {
      if (!userPosition || !selectedStep || selectedStep.etapes.length === 0) return;

      const closest = selectedStep.etapes.reduce(
        (min, curr) => {
          const dist = Math.hypot(
            userPosition[0] - curr.coords[0],
            userPosition[1] - curr.coords[1]
          );
          return dist < min.dist ? { ville: curr, dist } : min;
        },
        { ville: null, dist: Infinity }
      ).ville;

      try {
        const res = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [
              [userPosition[1], userPosition[0]],
              [closest.coords[1], closest.coords[0]],
            ],
          },
          {
            headers: {
              Authorization: ORS_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const route = res.data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        setRouteToStep(route);
      } catch (e) {
        console.error("Erreur ORS → ville la plus proche :", e);
      }
    };

    generateStepRoute();
    generateRouteToClosestVille();
  }, [selectedStep, userPosition]);

  const handleShowFullTrip = async () => {
    try {
      const allCoords = itineraire
        .flatMap((etape) => etape.etapes)
        .map((ville) => [ville.coords[1], ville.coords[0]]); // lon, lat

      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        { coordinates: allCoords },
        {
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const route = res.data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      setFullRoute(route);
      setStepRoute([]);
      setRouteToStep([]);
    } catch (e) {
      console.error("Erreur ORS itinéraire complet :", e);
    }
  };
  useEffect(() => {
    if (selectedActivity) {
      setFullRoute([]);
      setStepRoute([]);
      setRouteToStep([]);
    }
  }, [selectedActivity]);
  

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer center={selectedActivity ? selectedActivity.coords : [46.5, -1.5]} zoom={selectedActivity ? 12 : 6}  style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedActivity && (
          <Marker position={selectedActivity.coords} icon={userIcon}>
            <Popup>{selectedActivity.lieu}</Popup>
          </Marker>
        )}

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Ta position</Popup>
          </Marker>
        )}

        {stepRoute.length > 1 && <Polyline positions={stepRoute} color="blue" weight={6} />}
        {routeToStep.length > 1 && <Polyline positions={routeToStep} color="gray" dashArray="5" />}
        {fullRoute.length > 1 && <Polyline positions={fullRoute} color="purple" weight={6} />}

        <FollowUserControl followUser={followUser} />
      </MapContainer>

      <Fab
        onClick={() => setFollowUser(!followUser)}
        color={followUser ? "primary" : "default"}
        size="medium"
        sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}
      >
        <LocationSearchingIcon />
      </Fab>

      <Fab
        color="secondary"
        size="small"
        onClick={handleShowFullTrip}
        sx={{
          position: "absolute",
          bottom: 90,
          right: 16,
          zIndex: 1000,
        }}
      >
        <DirectionsIcon />
      </Fab>
    </div>
  );
};

export default MapPage;
