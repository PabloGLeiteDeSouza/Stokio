import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import StartApp from './functions/start_app';
import CodeScanner from '@components/CodeScanner';
import AuthScreen from '@screens/auth';
import Screens from './screens';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [pageStarting, setPageStarting] = React.useState<
    'auth-screen' | 'app-screens'
  >('auth-screen');

  React.useEffect(() => {
    StartApp(setIsLoading, setPageStarting);
    SplashScreen.hideAsync();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={pageStarting}>
        <Stack.Screen
          name="auth-screen"
          component={AuthScreen}
          options={{ title: 'Autenticacao' }}
        />
        <Stack.Screen
          name="app-screens"
          component={Screens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="code-scanner"
          component={CodeScanner}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
