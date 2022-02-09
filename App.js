import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import LocationProvider from './data/LocationProvider';
import Regions from './data/Regions';

export default function App() {
  const [region, setRegion] = useState();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const { latitude, longitude } = await LocationProvider.getLocation();
        const region = await LocationProvider.getRegion(latitude, longitude);
        setRegion(region);
      } catch (error) {
        setErrorMsg(error.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Region: {region ? region : '-'}</Text>
      <Text>Feed ID: {region ? Regions[region] : '-'}</Text>
      {errorMsg ? alert(errorMsg) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
