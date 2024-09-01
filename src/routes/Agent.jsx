import AgentHome from 'src/pages/agents/home/Home'
import AgentUserRegistration from 'src/pages/agents/home/UserRegistration'
import AgentHospitalRegistration from 'src/pages/agents/home/HospitalRegistration';
import AgentHospitals from 'src/pages/agents/hospitals/Hospitals';
import AgentUsers from 'src/pages/agents/users/Users';
import AgentProfile from 'src/pages/agents/profile/Profile';
import { Pay } from './Pay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { faHome, faHospital, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => <FontAwesomeIcon icon={ faHome } size={ 24 } />,
};

const HospitalsOptions = {
    tabBarLabel: 'Hospitals',
    tabBarIcon: () => <FontAwesomeIcon icon={ faHospital } size={ 24 } />,
};

const HealthkardsOptions = {
    tabBarLabel: 'Healthkards',
    tabBarIcon: () => <FontAwesomeIcon icon={ faIdCard } size={ 24 } />,
};

const ProfileOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: () => <FontAwesomeIcon icon={ faUser } size={ 24 } />,
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

// Agent routes
export const Agent = () => {
    return (
        <Tab.Navigator screenOptions={ tabOptions } initialRouteName='Home'>
            <Tab.Screen name="AgentHomeNavigations" component={ AgentHomeNavigations } options={ HomeOptions } />
            <Tab.Screen name="AgentHospitals" component={ AgentHospitals } options={ HospitalsOptions } />
            <Tab.Screen name="AgentUsers" component={ AgentUsers } options={ HealthkardsOptions } />
            <Tab.Screen name="AgentProfile" component={ AgentProfile } options={ ProfileOptions } />
        </Tab.Navigator>
    );
};

export const AgentHomeNavigations = () => {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName="Home">
            <Stack.Screen name="Home" component={ AgentHome } />
            <Stack.Screen name="AgentUserRegistrationPayment" component={ AgentUserPayment } />
            <Stack.Screen name="AgentHospitalRegistration" component={ AgentHospitalRegistration } />
        </Stack.Navigator>
    );
};

// agent user payment
export const AgentUserPayment = () => {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName="AgentUserRegistration">
            <Stack.Screen name="AgentUserRegistration" component={ AgentUserRegistration } />
            <Stack.Screen name="Pay" component={ Pay } />
        </Stack.Navigator>
    )
}
