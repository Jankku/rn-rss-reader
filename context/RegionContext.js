import { createContext, useState } from 'react';
import RegionController from '../data/RegionController';

export const RegionContext = createContext({
  region: '',
  updateRegion: () => {},
});

export function RegionContextProvider({ children }) {
  const [region, setRegion] = useState('');

  const updateRegion = async (region) => {
    setRegion(region);
    await RegionController.saveRegion(region);
  };

  return <RegionContext.Provider value={{ region, updateRegion }}>{children}</RegionContext.Provider>;
}
