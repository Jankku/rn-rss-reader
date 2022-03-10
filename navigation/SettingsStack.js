import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import AppbarStyle from './AppbarStyle';

function SettingsStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={AppbarStyle}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingsStack;
