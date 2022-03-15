import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@react-navigation/native';

function SettingsStack() {
  const Stack = createNativeStackNavigator();
  const { isDark } = useContext(ThemeContext);
  const { colors } = useTheme();
  const headerBackground = isDark ? colors.card : colors.primary;

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        headerStyle: {
          backgroundColor: headerBackground,
        },
        headerTintColor: colors.headerText,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
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
