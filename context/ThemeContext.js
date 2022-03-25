import { createContext, useState, useEffect, useMemo } from 'react';
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

  const { Theme } = ThemeController;

  useEffect(() => {
    (async () => {
      const currentTheme = await ThemeController.getTheme();
      setIsDark(currentTheme === Theme.DARK);
    })();
  }, [Theme]);

  useEffect(() => {
    (async () => {
      setTheme(isDark ? darkTheme : lightTheme);
      await ThemeController.setTheme(isDark ? Theme.DARK : Theme.LIGHT);
    })();
  }, [isDark, Theme]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </ThemeContext.Provider>
  );
}
