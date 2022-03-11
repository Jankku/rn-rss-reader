import { useContext, useEffect } from 'react';
import * as Location from 'expo-location';
import LocationProvider from './data/LocationProvider';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import RegionController from './data/RegionController';
import { RegionContext } from './context/RegionContext';
import { LocationContext } from './context/LocationContext';

export default function App() {
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
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  NavigationBar.setBackgroundColorAsync(isDarkMode ? 'black' : 'white');

  useEffect(() => {
    (async () => {
      const useLocation = await RegionController.shouldUseLocation();
      updateShouldUseLocation(useLocation);
    })();
  }, []);

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
  }, [hasLocationPermission, shouldUseLocation]);

  useEffect(() => {
    (async () => {
      if (hasLocationPermission && shouldUseLocation) {
        const { latitude, longitude } = await LocationProvider.getLocation();
        updateLocation({ latitude, longitude });
      }
    })();
  }, [hasLocationPermission, shouldUseLocation]);

  useEffect(() => {
    (async () => {
      const newRegion = location
        ? await LocationProvider.getRegion(location.latitude, location.longitude)
        : await RegionController.getRegion();
      updateRegion(newRegion);
    })();
  }, [location]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RootSiblingParent>
          <BottomTabNavigator />
        </RootSiblingParent>
      </NavigationContainer>

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
