import App from './App';
import { LocationContextProvider } from './context/LocationContext';
import { RegionContextProvider } from './context/RegionContext';
import { ThemeContextProvider } from './context/ThemeContext';

export default function AppWrapper() {
  return (
    <LocationContextProvider>
      <RegionContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </RegionContextProvider>
    </LocationContextProvider>
  );
}
