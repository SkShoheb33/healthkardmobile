import React from 'react'
import { SafeAreaView } from 'react-native'
import Home from './tabs/home/Home'
import BaseNavigation from './components/BaseNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Hospital from './tabs/hospitals/Hospital';
import Hospitals from './tabs/hospitals/Hospitals';
import Navbar from './tabs/home/Navbar';
import { faHome, faHospital, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Healthkards from './tabs/healthkard/Healthkards';
import Healthkard from './tabs/healthkard/Healthkard';
import NewKard from './tabs/healthkard/NewKard';
function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const tabOptions = {
    tabBarLabelPosition : "below-icon",
    headerShown:false,
    tabBarShowLabel:true,
    tabBarActiveTintColor:'black',
    tabBarActiveBackgroundColor:'#E5F7EF',
    tabBarStyle: {
      backgroundColor:'#00BFA8'
    },
  }
  const HomeOptions = {
    tabBarLabel:'Home',
    tabBarIcon: ()=><FontAwesomeIcon icon={faHome} size={24} />
  }
  const HospitalsOptions = {
    tabBarLabel:'Hospitals',
    tabBarIcon: ()=><FontAwesomeIcon icon={faHospital} size={24} />
  }
  const HealthkardsOptions = {
    tabBarLabel:'Healthkards',
    tabBarIcon: ()=><FontAwesomeIcon icon={faIdCard} size={24}/>
  }
  return (
    <SafeAreaView className="h-full">
      <Navbar/>
      <NavigationContainer>
        <Tab.Navigator screenOptions={tabOptions} initialRouteName='Home'>
          <Tab.Screen name="Home" component={Home} options={HomeOptions}/>
          <Tab.Screen name="HospitalsNavigation" component={HospitalsNavigation} options={HospitalsOptions}/>
          <Tab.Screen name="HealthkardsNavigation" component={HealthkardsNavigation} options={HealthkardsOptions}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
const HealthkardsNavigation = ()=>{
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Healthkards'>
      <Stack.Screen name='Healthkards' component={NewKardNavigation} />
      <Stack.Screen name='Healthkard' component={Healthkard} />
    </Stack.Navigator>
  )
}
const HospitalsNavigation = ()=>{
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Hospitals'>
      <Stack.Screen name='Hospitals' component={Hospitals} />
      <Stack.Screen name='Hospital' component={Hospital} />
    </Stack.Navigator>
  )
}
const NewKardNavigation = ()=>{
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='HealthkardsList'>
      <Stack.Screen name='HealthkardsList' component={Healthkards} />
      <Stack.Screen name='NewKard' component={NewKard} />
    </Stack.Navigator>
  )
}



export default App
