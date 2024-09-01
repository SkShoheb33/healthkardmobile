import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import First from './src/pages/main/First';
import UserRegister from './src/pages/main/UserRegister';
import UserLogin from './src/pages/main/UserLogin';
import { Agent } from 'src/routes/Agent';
import { User } from 'src/routes/User';
import AgentLogin from 'src/pages/main/AgentLogin';

enableScreens();

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider style={ { flex: 1 } } className='bg-white'>
      <NavigationContainer>
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName="First">
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
