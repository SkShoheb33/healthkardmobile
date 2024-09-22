import AgentHome from 'src/pages/agents/home/Home'
import UserRegistration from 'src/pages/agents/home/UserRegistration'
import AgentHospitalRegistration from 'src/pages/agents/home/HospitalRegistration';
import HospitalRegister from 'src/pages/agents/home/HospitalRegistrationForms/HospitalRegister';
import AgentHospitals from 'src/pages/agents/hospitals/Hospitals';
import AgentUsers from 'src/pages/agents/users/Users';
import AgentProfile from 'src/pages/agents/profile/Profile';
import Healthkard from '@components/Healthkard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { faHome, faHospital, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import UserRenewal from 'src/pages/agents/home/UserRenewal/UserRenewal';
import Payment from '@components/Payment';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabOptions = {
    tabBarLabelPosition: 'below-icon',
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#000000',
    tabBarInactiveTintColor: '#FFFFFF',
    tabBarActiveBackgroundColor: '#FFFFFF',
    tabBarStyle: {
        backgroundColor: '#303486',
    },
};

const createTabBarIcon = (icon) => ({ focused }) => (
    <FontAwesomeIcon
        icon={ icon }
        size={ 24 }
        color={ focused ? '#303486' : '#FFFFFF' }
    />
);

const HomeOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: createTabBarIcon(faHome),
};

const HospitalsOptions = {
    tabBarLabel: 'Hospitals',
    tabBarIcon: createTabBarIcon(faHospital),
};

const HealthkardsOptions = {
    tabBarLabel: 'Healthkards',
    tabBarIcon: createTabBarIcon(faIdCard),
};

const ProfileOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: createTabBarIcon(faUser),
};

// Agent routes
export const Agent = () => {
    return (
        <Tab.Navigator screenOptions={ tabOptions } initialRouteName='AgentHomeNavigations'>
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
            <Stack.Screen name="UserRegistration" component={ UserRegistration } />
            <Stack.Screen name="UserRenewal" component={ UserRenewal } />
            <Stack.Screen name="Healthkard" component={ Healthkard } />
            <Stack.Screen name="HospitalRegister" component={ HospitalRegister } />
            <Stack.Screen name="AgentHospitalRegistration" component={ AgentHospitalRegistration } />
            <Stack.Screen name="Pay" component={ Payment } />
        </Stack.Navigator>
    );
};
