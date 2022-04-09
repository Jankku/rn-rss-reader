import { render } from '@testing-library/react-native';
import { ThemeContextProvider } from '../context/ThemeContext';
import { LocationContextProvider } from '../context/LocationContext';
import { RegionContextProvider } from '../context/RegionContext';

const AllProviders = ({ children }) => {
  return (
    <LocationContextProvider>
      <RegionContextProvider>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </RegionContextProvider>
    </LocationContextProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
