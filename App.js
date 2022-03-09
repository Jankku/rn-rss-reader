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

export const RegionContext = createContext({});

export default function App() {
  const scheme = useColorScheme();
  const [region, setRegion] = useState();
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [location, setLocation] = useState();
  const [locationPermGranted, setLocationPermGranted] = useState();
  const isDarkMode = scheme === 'dark';

  NavigationBar.setBackgroundColorAsync(isDarkMode ? 'black' : 'white');

  useEffect(() => {
    (async () => {
      if (await RegionController.shouldUseLocation()) {
        const { granted, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        setLocationPermGranted(granted);

        if (!granted && canAskAgain) {
          setShowLocationAlert(true);
        }
      }
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
      const region = location
        ? await LocationProvider.getRegion(location.latitude, location.longitude)
        : await RegionController.getRegion();
      setRegion(region);
    })();
  }, [location]);

  const updateRegion = async (region) => {
    setRegion(region);
    await RegionController.saveRegion(region);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RegionContext.Provider value={{ region, updateRegion }}>
          <RootSiblingParent>
            <BottomTabNavigator />
          </RootSiblingParent>
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
                await RegionController.setShouldUseLocation(granted);
              },
            },
          ])
        : null}
    </SafeAreaProvider>
  );
}
