import { useContext, useEffect } from 'react';
import { getFocusedRouteNameFromRoute, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import { RegionContext } from '../context/RegionContext';
import { ThemeContext } from '../context/ThemeContext';

function NewsFeedStack({ navigation, route }) {
  const Stack = createNativeStackNavigator();
  const { region } = useContext(RegionContext);
  const { colors } = useTheme();
  const { isDark } = useContext(ThemeContext);
  const headerBackground = isDark ? colors.card : colors.primary;

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'NewsDetail') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

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
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{
          title: region,
        }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{
          title: '',
          headerTitleStyle: {
            fontWeight: '400',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default NewsFeedStack;
