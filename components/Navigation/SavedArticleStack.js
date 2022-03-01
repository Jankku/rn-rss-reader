import { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedArticleDetailScreen from '../../screens/SavedArticleDetailScreen';
import SavedArticlesScreen from '../../screens/SavedArticlesScreen';
import AppbarStyle from './AppbarStyle';

function SavedArticleStack({ navigation, route }) {
  const Stack = createNativeStackNavigator();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({
      tabBarStyle: {
        display: routeName === 'SavedArticleDetail' ? 'none' : 'flex',
      },
    });
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={AppbarStyle}>
      <Stack.Screen
        name="SavedArticleFeed"
        component={SavedArticlesScreen}
        options={{
          title: 'Saved articles',
        }}
      />
      <Stack.Screen
        name="SavedArticleDetail"
        component={SavedArticleDetailScreen}
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

export default SavedArticleStack;
