import AsyncStorage from '@react-native-async-storage/async-storage';

const RegionController = {
  /**
   * Get user's region
   * @returns {Promise<String>}
   */
  async getRegion() {
    try {
      const region = await AsyncStorage.getItem('region');

      if (region === null) {
        await this.saveRegion('Kotimaa');
        return 'Kotimaa';
      }

      return region;
    } catch (error) {
      throw new Error("Couldn't get region");
    }
  },

  /**
   * Sets the user's region
   * @param {string} region - Valid region
   */
  async saveRegion(region) {
    try {
      await AsyncStorage.setItem('region', region);
    } catch (error) {
      throw new Error("Couldn't save region");
    }
  },

  /**
   * @returns {Promise<Boolean>}
   */
  async shouldUseLocation() {
    try {
      const useLocation = await AsyncStorage.getItem('useLocation');

      if (useLocation === null) {
        await this.setShouldUseLocation(false);
        return false;
      }

      return useLocation === 'true';
    } catch (error) {
      throw new Error("Couldn't get useLocation value");
    }
  },

  /**
   * @param {Boolean} value
   */
  async setShouldUseLocation(value) {
    try {
      await AsyncStorage.setItem('useLocation', `${value}`);
    } catch (error) {
      throw new Error("Couldn't save useLocation value");
    }
  },
};

export default RegionController;
