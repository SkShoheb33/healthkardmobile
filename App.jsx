import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './src/pages/Home';
import Hospitals from './src/pages/Hospitals';
import Hospital from './src/pages/Hospital';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { faHome, faHospital, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Healthkards from './src/pages/Healthkards';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import NewKard from './src/components/healthkards/NewKard';
import Healthkard from './src/components/healthkards/Healthkard';
import Profile from './src/pages/Profile';
import First from './src/pages/First';
import UserRegister from './src/pages/UserRegister';
import UserLogin from './src/pages/UserLogin';
import AgentHome from './src/pages/agents/screens/home/Home'
import AgentUserRegistration from './src/pages/agents/screens/home/UserRegistration'
import AgentHospitalRegistration from './src/pages/agents/screens/home/HospitalRegistration';
import AgentHospitals from './src/pages/agents/screens/hospitals/Hospitals';
import AgentUsers from './src/pages/agents/screens/users/Users';
import AgentProfile from './src/pages/agents/screens/profile/Profile';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: () => <FontAwesomeIcon icon={faHome} size={24} />,
};

const HospitalsOptions = {
  tabBarLabel: 'Hospitals',
  tabBarIcon: () => <FontAwesomeIcon icon={faHospital} size={24} />,
};

const HealthkardsOptions = {
  tabBarLabel: 'Healthkards',
  tabBarIcon: () => <FontAwesomeIcon icon={faIdCard} size={24} />,
};

const ProfileOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: () => <FontAwesomeIcon icon={faUser} size={24} />,
};

const tabOptions = {
  tabBarLabelPosition: 'below-icon',
  headerShown: false,
  tabBarShowLabel: true,
  tabBarActiveTintColor: 'black',
  inactiveTintColor: '#fff',
  tabBarActiveBackgroundColor: '#E5F7EF',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#00BFA8',
  },
};

function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="First">
          <Stack.Screen name="First" component={First} />
          <Stack.Screen name="UserRegister" component={UserRegister} />
          <Stack.Screen name="UserLogin" component={UserLogin} />
          <Stack.Screen name="user" component={User} />
          <Stack.Screen name="agent" component={Agent} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
// Agent routes
const Agent = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions} initialRouteName='AgentHomeNavigations'>
      <Tab.Screen name="AgentHomeNavigations" component={AgentHomeNavigations} options={HomeOptions} />
      <Tab.Screen name="AgentHospitals" component={AgentHospitals} options={HospitalsOptions} />
      <Tab.Screen name="AgentUsers" component={AgentUsers} options={HealthkardsOptions} />
      <Tab.Screen name="AgentProfile" component={AgentProfile} options={ProfileOptions} />
    </Tab.Navigator>
  );
};

const AgentHomeNavigations = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AgentHome">
      <Stack.Screen name="AgentHome" component={AgentHome} />
      <Stack.Screen name="AgentUserRegistration" component={AgentUserRegistration} />
      <Stack.Screen name="AgentHospitalRegistration" component={AgentHospitalRegistration}/>
    </Stack.Navigator>
  );
};





// User routes
const User = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name="Home" component={Home} options={HomeOptions} />
      <Tab.Screen name="HospitalsNavigation" component={HospitalsNavigation} options={HospitalsOptions} />
      <Tab.Screen name="HealthkardsNavigation" component={HealthkardsNavigation} options={HealthkardsOptions} />
      <Tab.Screen name="Profile" component={Profile} options={ProfileOptions} />
    </Tab.Navigator>
  );
};

const HealthkardsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Healthkards">
      <Stack.Screen name="Healthkards" component={Healthkards} />
      <Stack.Screen name="Healthkard" component={Healthkard} />
      <Stack.Screen name="NewKard" component={NewKard} />
    </Stack.Navigator>
  );
};

const HospitalsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Hospitals">
      <Stack.Screen name="Hospitals" component={Hospitals} />
      <Stack.Screen name="Hospital" component={Hospital} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
