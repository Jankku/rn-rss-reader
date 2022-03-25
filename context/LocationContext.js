import { createContext, useState, useMemo } from 'react';
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
    await RegionController.setShouldUseLocation(value);
    setShouldUseLocation(value);
  };

  const updateShowLocationPermissionAlert = (value) => {
    setShowLocationPermissionAlert(value);
  };

  const updateHasLocationPermission = (value) => {
    setHasLocationPermission(value);
  };

  const value = useMemo(
    () => ({
      location,
      shouldUseLocation,
      showLocationPermissionAlert,
      hasLocationPermission,
      updateLocation,
      updateShouldUseLocation,
      updateShowLocationPermissionAlert,
      updateHasLocationPermission,
    }),
    [hasLocationPermission, location, shouldUseLocation, showLocationPermissionAlert]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
