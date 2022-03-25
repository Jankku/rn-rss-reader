import { createContext, useState, useMemo } from 'react';
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

  const value = useMemo(() => ({ region, updateRegion }), [region]);

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}
