import { useContext, useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegionContext } from '../../App';
import NewsDetailScreen from '../../screens/NewsDetailScreen';
import NewsFeedScreen from '../../screens/NewsFeedScreen';

function NewsFeedStack({ navigation, route }) {
  const Stack = createNativeStackNavigator();
  const region = useContext(RegionContext);

  useLayoutEffect(() => {
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
          backgroundColor: '#0E65CC',
        },
        headerTintColor: '#fff',
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
