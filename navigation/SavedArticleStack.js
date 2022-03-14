import { useEffect, useContext } from 'react';
import { getFocusedRouteNameFromRoute, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedArticleDetailScreen from '../screens/SavedArticleDetailScreen';
import SavedArticlesScreen from '../screens/SavedArticlesScreen';
import { ThemeContext } from '../context/ThemeContext';

function SavedArticleStack({ navigation, route }) {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();
  const { isDark } = useContext(ThemeContext);
  const headerBackground = isDark ? colors.card : colors.primary;

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({
      tabBarStyle: {
        display: routeName === 'SavedArticleDetail' ? 'none' : 'flex',
      },
    });
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
