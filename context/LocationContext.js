import { createContext, useState } from 'react';
import RegionController from '../data/RegionController';

export const LocationContext = createContext({
  location: {
    latitude: 0.0,
    longitude: 0.0,
  },
  shouldUseLocation: false,
  showLocationPermissionAlert: false,
  hasLocationPermission: false,
  updateLocation: () => {},
  updateShouldUseLocation: () => {},
  updateShowLocationPermissionAlert: () => {},
  updateHasLocationPermission: () => {},
});

export function LocationContextProvider({ children }) {
  const [location, setLocation] = useState();
  const [shouldUseLocation, setShouldUseLocation] = useState();
  const [showLocationPermissionAlert, setShowLocationPermissionAlert] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState();

  const updateLocation = async ({ latitude, longitude }) => {
    setLocation({
      latitude,
      longitude,
    });
  };

  const updateShouldUseLocation = async (value) => {
    setShouldUseLocation(value);
    await RegionController.setShouldUseLocation(value);
  };

  const updateShowLocationPermissionAlert = (value) => {
    setShowLocationPermissionAlert(value);
  };

  const updateHasLocationPermission = (value) => {
    setHasLocationPermission(value);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        shouldUseLocation,
        showLocationPermissionAlert,
        hasLocationPermission,
        updateLocation,
        updateShouldUseLocation,
        updateShowLocationPermissionAlert,
        updateHasLocationPermission,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
