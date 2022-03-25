import { useContext, useEffect } from 'react';
import * as Location from 'expo-location';
import LocationProvider from './data/LocationProvider';
import { useTheme } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import RegionController from './data/RegionController';
import { RegionContext } from './context/RegionContext';
import { LocationContext } from './context/LocationContext';

export default function App() {
  const { colors } = useTheme();
  const { updateRegion } = useContext(RegionContext);
  const {
    location,
    shouldUseLocation,
    showLocationPermissionAlert,
    hasLocationPermission,
    updateLocation,
    updateShouldUseLocation,
    updateShowLocationPermissionAlert,
    updateHasLocationPermission,
  } = useContext(LocationContext);

  NavigationBar.setBackgroundColorAsync(colors.card);

  useEffect(() => {
    (async () => {
      const useLocation = await RegionController.shouldUseLocation();
      updateShouldUseLocation(useLocation);
    })();
  }, [updateShouldUseLocation]);

  useEffect(() => {
    (async () => {
      if (shouldUseLocation && !hasLocationPermission) {
        const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        updateHasLocationPermission(granted);

        if (!granted && canAskAgain) {
          updateShowLocationPermissionAlert(true);
        }
      }
    })();
  }, [
    hasLocationPermission,
    shouldUseLocation,
    updateHasLocationPermission,
    updateShowLocationPermissionAlert,
  ]);

  useEffect(() => {
    (async () => {
      if (hasLocationPermission && shouldUseLocation) {
        const { latitude, longitude } = await LocationProvider.getLocation();
        updateLocation({ latitude, longitude });
      }
    })();
  }, [hasLocationPermission, shouldUseLocation, updateLocation]);

  useEffect(() => {
    (async () => {
      const newRegion = location
        ? await LocationProvider.getRegion(location.latitude, location.longitude)
        : await RegionController.getRegion();
      updateRegion(newRegion);
    })();
  }, [location, updateRegion]);

  return (
    <SafeAreaProvider>
      <StatusBar style={'light'} />
      <RootSiblingParent>
        <BottomTabNavigator />
      </RootSiblingParent>

      {showLocationPermissionAlert
        ? Alert.alert('Hi!', 'You can either use location or manually select a region', [
            {
              text: 'Manual',
              onPress: async () => {
                updateShowLocationPermissionAlert(false);
                updateShouldUseLocation(false);
                await RegionController.saveRegion('Kotimaa');
              },
            },
            {
              text: 'Location',
              onPress: async () => {
                updateShowLocationPermissionAlert(false);
                const { granted } = await Location.requestForegroundPermissionsAsync();
                updateHasLocationPermission(granted);
                updateShouldUseLocation(granted);
              },
            },
          ])
        : null}
    </SafeAreaProvider>
  );
}
