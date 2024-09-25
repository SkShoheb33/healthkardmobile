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
import UsersConditions from 'src/pages/main/termsAndConditons/UsersConditions';
import CookiePolicy from 'src/pages/main/termsAndConditons/CookiePolicy';
import RefundPolicy from 'src/pages/main/termsAndConditons/RefundPolicy';
import Tour from 'src/pages/main/tour/Tour';

enableScreens();

const Stack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAgentLoggedIn, setIsAgentLoggedIn] = useState(false);
  const [isTourCompleted, setIsTourCompleted] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      setIsUserLoggedIn(!!userId);
      const agentId = await AsyncStorage.getItem('agentId');
      setIsAgentLoggedIn(!!agentId);
      const tourCompleted = await AsyncStorage.getItem('TourCompleted');
      setIsTourCompleted(!!tourCompleted);
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
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName={ isUserLoggedIn ? "user" : isAgentLoggedIn ? "agent" : isTourCompleted ? "First" : "Tour" }>
          <Stack.Screen name="Tour" component={ Tour } />
          <Stack.Screen name="First" component={ First } />
          <Stack.Screen name="UserLogin" component={ UserLogin } />
          <Stack.Screen name="UserRegister" component={ UserRegister } />
          <Stack.Screen name="AgentLogin" component={ AgentLogin } />
          <Stack.Screen name="user" component={ User } />
          <Stack.Screen name="agent" component={ Agent } />
          <Stack.Screen name="UsersConditions" component={ UsersConditions } />
          <Stack.Screen name="CookiePolicy" component={ CookiePolicy } />
          <Stack.Screen name="RefundPolicy" component={ RefundPolicy } />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
