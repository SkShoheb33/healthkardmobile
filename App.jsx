import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import First from './src/pages/main/First';
import UserRegister from './src/pages/main/UserRegister';
import UserLogin from './src/pages/main/UserLogin';
import { Agent } from 'src/routes/Agent';
import { User } from 'src/routes/User';
import AgentLogin from 'src/pages/main/AgentLogin';
import SplashScreen from 'src/pages/main/SplashScreen';

enableScreens();

const Stack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      setIsLoggedIn(!!userId);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={ handleSplashFinish } />;
  }

  return (
    <SafeAreaProvider style={ { flex: 1 } } className='bg-white'>
      <NavigationContainer>
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName={ isLoggedIn ? "user" : "First" }>
          <Stack.Screen name="First" component={ First } />
          <Stack.Screen name="UserLogin" component={ UserLogin } />
          <Stack.Screen name="UserRegister" component={ UserRegister } />
          <Stack.Screen name="AgentLogin" component={ AgentLogin } />
          <Stack.Screen name="user" component={ User } />
          <Stack.Screen name="agent" component={ Agent } />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
