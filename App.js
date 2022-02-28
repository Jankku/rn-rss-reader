import 'expo-dev-client';
import { createContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import LocationProvider from './data/LocationProvider';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import TabNavigator from './components/Navigation/TabNavigator';

export const RegionContext = createContext('');

export default function App() {
  const scheme = useColorScheme();
  const [region, setRegion] = useState();
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [location, setLocation] = useState();
  const [locationPermGranted, setLocationPermGranted] = useState();

  NavigationBar.setBackgroundColorAsync(scheme === 'dark' ? 'black' : 'white');

  useEffect(() => {
    (async () => {
      try {
        const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        setLocationPermGranted(granted);

        if (!granted && canAskAgain) {
          setShowLocationAlert(true);
        }
      } catch (ignored) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (locationPermGranted) {
        const { latitude, longitude } = await LocationProvider.getLocation();
        setLocation({ latitude, longitude });
      }
    })();
  }, [locationPermGranted]);

  useEffect(() => {
    (async () => {
      if (location !== undefined) {
        const region = await LocationProvider.getRegion(location.latitude, location.longitude);
        setRegion(region);
      }
    })();
  }, [location]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RegionContext.Provider value={region}>
          <RootSiblingParent>
            <TabNavigator />
          </RootSiblingParent>
        </RegionContext.Provider>
      </NavigationContainer>

      {showLocationAlert
        ? Alert.alert('Hi!', "Please grant location permission. It's needed for loading your regions's news feed.", [
            // TODO: Add way to choose region manually
            {
              text: 'Grant permission',
              onPress: async () => {
                setShowLocationAlert(false);
                const { granted } = await Location.requestForegroundPermissionsAsync();
                setLocationPermGranted(granted);
              },
            },
          ])
        : null}
    </SafeAreaProvider>
  );
}
