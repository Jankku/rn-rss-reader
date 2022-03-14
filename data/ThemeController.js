import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeController = {
  Theme: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTOMATIC: 'automatic',
  },

  /**
   * @returns {string} Theme value, See ThemeController.Theme for possible values
   */
  async getTheme() {
    try {
      const theme = await AsyncStorage.getItem('theme');

      if (theme === null) {
        await this.saveTheme(this.Theme.AUTOMATIC);
        return this.Theme.AUTOMATIC;
      }

      return theme;
    } catch (error) {
      throw new Error("Couldn't get theme");
    }
  },

  /**
   * @param {string} theme Valid theme, see ThemeController.Theme
   */
  async setTheme(theme) {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      throw new Error("Couldn't set theme");
    }
  },
};

export default ThemeController;
