import { LOCATION_API_KEY, LOCATION_BASE_URL } from '@env';
import * as Location from 'expo-location';

const LocationProvider = {
  /**
   * First tries to return last known location.
   * If it's not available, get current location with lowest accuracy.
   * @returns User location
   */
  async getLocation() {
    const lastKnownPosition = await Location.getLastKnownPositionAsync({});

    if (lastKnownPosition === null) {
      const currentLocation = await Location.getCurrentPositionAsync({
        mayShowUserSettingsDialog: false,
        accuracy: Location.LocationAccuracy.Lowest,
      });

      return {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
    } else {
      return {
        latitude: lastKnownPosition.coords.latitude,
        longitude: lastKnownPosition.coords.longitude,
      };
    }
  },

  /**
   * @param {number} latitude
   * @param {number} longitude
   * @returns Region response JSON
   */
  async getRegion(latitude, longitude) {
    if (__DEV__) return 'North Ostrobothnia';

    return await fetch(
      `${LOCATION_BASE_URL}/reverse.php?key=${LOCATION_API_KEY}&lat=${latitude}&lon=${longitude}&zoom=8&format=json`
    )
      .then((res) => res.json())
      .then((json) => json.address.county);
  },
};

export default LocationProvider;
