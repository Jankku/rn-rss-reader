import { createContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import LocationProvider from './data/LocationProvider';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import BottomTabNavigator from './components/Navigation/BottomTabNavigator';
import RegionController from './data/RegionController';

export const RegionContext = createContext({
  region: '',
  updateRegion: () => {},
});

export const LocationContext = createContext({
  location: {
    latitude: 0.0,
    longitude: 0.0,
  },
  shouldUseLocation: false,
  updateShouldUseLocation: () => {},
});

export default function App() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const [region, setRegion] = useState('');
  const [location, setLocation] = useState();
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [shouldUseLocation, setShouldUseLocation] = useState();
  const [locationPermGranted, setLocationPermGranted] = useState();

  NavigationBar.setBackgroundColorAsync(isDarkMode ? 'black' : 'white');

  useEffect(() => {
    (async () => {
      const useLocation = await RegionController.shouldUseLocation();
      setShouldUseLocation(useLocation);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (shouldUseLocation && !locationPermGranted) {
        const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        setLocationPermGranted(granted);

        if (!granted && canAskAgain) {
          setShowLocationAlert(true);
        }
      }
    })();
  }, [locationPermGranted, shouldUseLocation]);

  useEffect(() => {
    (async () => {
      if (locationPermGranted && shouldUseLocation) {
        const { latitude, longitude } = await LocationProvider.getLocation();
        setLocation({ latitude, longitude });
      }
    })();
  }, [locationPermGranted, shouldUseLocation]);

  useEffect(() => {
    (async () => {
      const newRegion = location
        ? await LocationProvider.getRegion(location.latitude, location.longitude)
        : await RegionController.getRegion();
      setRegion(newRegion);
    })();
  }, [location]);

  const updateRegion = async (region) => {
    setRegion(region);
    await RegionController.saveRegion(region);
  };

  const updateShouldUseLocation = async (value) => {
    setShouldUseLocation(value);
    await RegionController.setShouldUseLocation(value);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RegionContext.Provider value={{ region, updateRegion }}>
          <LocationContext.Provider value={{ location, shouldUseLocation, updateShouldUseLocation }}>
            <RootSiblingParent>
              <BottomTabNavigator />
            </RootSiblingParent>
          </LocationContext.Provider>
        </RegionContext.Provider>
      </NavigationContainer>

      {showLocationAlert
        ? Alert.alert('Hi!', 'You can either use location or manually select a region', [
            {
              text: 'Manual',
              onPress: async () => {
                setShowLocationAlert(false);
                await RegionController.setShouldUseLocation(false);
                await RegionController.saveRegion('Kotimaa');
              },
            },
            {
              text: 'Location',
              onPress: async () => {
                setShowLocationAlert(false);
                const { granted } = await Location.requestForegroundPermissionsAsync();
                setLocationPermGranted(granted);
                updateShouldUseLocation(granted);
              },
            },
          ])
        : null}
    </SafeAreaProvider>
  );
}
