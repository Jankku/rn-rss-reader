import { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme';
import { NavigationContainer } from '@react-navigation/native';
import ThemeController from '../data/ThemeController';

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  const [isDark, setIsDark] = useState(false);

  const {
    Theme: { DARK, LIGHT },
  } = ThemeController;

  useEffect(() => {
    (async () => {
      const currentTheme = await ThemeController.getTheme();
      setIsDark(currentTheme === DARK);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setTheme(isDark ? darkTheme : lightTheme);
      await ThemeController.setTheme(isDark ? DARK : LIGHT);
    })();
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </ThemeContext.Provider>
  );
}
