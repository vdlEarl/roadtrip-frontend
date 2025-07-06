import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <TripContext.Provider value={{ selectedStep, setSelectedStep }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);

