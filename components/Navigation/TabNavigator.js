import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NewsFeedStack } from './Stack';

function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'NewsFeedTab':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'SavedTab':
              iconName = focused ? 'star' : 'star-outline';
              break;
            case 'SettingsTab':
              iconName = focused ? 'settings-sharp' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="NewsFeedTab" component={NewsFeedStack} options={{ title: 'Feed' }} />
      <Tab.Screen name="SavedTab" component={NewsFeedStack} options={{ title: 'Saved' }} />
      <Tab.Screen name="SettingsTab" component={NewsFeedStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
