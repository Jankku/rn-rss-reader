import { createContext, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RegionContext } from '../App';
import Regions from '../data/Regions';
import NewsList from '../components/Feed/NewsList';

export const RegionIdContext = createContext();

function Feed() {
  const region = useContext(RegionContext);
  const [regionId, setRegionId] = useState();

  useEffect(() => {
    setRegionId(Regions[region]);
  }, [region]);

  return (
    <View style={{ flex: 1 }}>
      <RegionIdContext.Provider value={regionId}>
        <NewsList />
      </RegionIdContext.Provider>
    </View>
  );
}

export default Feed;
