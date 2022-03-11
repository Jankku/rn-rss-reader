import App from './App';
import { LocationContextProvider } from './context/LocationContext';
import { RegionContextProvider } from './context/RegionContext';

export default function AppWrapper() {
  return (
    <LocationContextProvider>
      <RegionContextProvider>
        <App />
      </RegionContextProvider>
    </LocationContextProvider>
  );
}
