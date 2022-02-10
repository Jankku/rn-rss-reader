import { useContext } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegionContext } from '../App';
import Regions from '../data/Regions';
import { useTheme } from '@react-navigation/native';

function Home() {
  const region = useContext(RegionContext);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text }}>Region: {region ? region : '-'}</Text>
      <Text style={{ color: colors.text }}>Feed ID: {region ? Regions[region] : '-'}</Text>
    </SafeAreaView>
  );
}

export default Home;
