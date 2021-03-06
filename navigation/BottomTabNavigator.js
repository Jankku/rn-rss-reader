import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewsFeedStack from './NewsFeedStack';
import SavedArticleStack from './SavedArticleStack';
import SettingsStack from './SettingsStack';

function BottomTabNavigator() {
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
              iconName = focused ? 'heart' : 'heart-outline';
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
      <Tab.Screen name="SavedTab" component={SavedArticleStack} options={{ title: 'Saved' }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
