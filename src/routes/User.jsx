import Healthkards from 'src/pages/users/healthkards/Healthkards';
import NewKard from 'src/pages/users/healthkards/components/NewKard';
import Healthkard from '@components/Healthkard';
import Profile from 'src/pages/users/profile/Profile';
import RenewalHistory from 'src/pages/users/profile/components/RenewalHistory';
import Home from 'src/pages/users/home/Home';
import Hospitals from 'src/pages/users/hospitals/Hospitals';
import Hospital from 'src/pages/users/hospitals/Hospital';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { faHome, faHospital, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Renewal from 'src/pages/users/healthkards/components/Renewal';
import TermsAndCondition from 'src/pages/users/profile/components/TermsAndConditions';
import Payment from '@components/Payment';
import { UserSharedDataProvider } from 'src/context/UserSharedDataContext';
import HelpAndFeedback from 'src/pages/users/profile/components/HelpAndFeedback';

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


// User routes
export const User = () => {
    return (
        <UserSharedDataProvider>
            <Tab.Navigator screenOptions={ tabOptions } initialRouteName='Home'>
                <Tab.Screen name="Home" component={ Home } options={ HomeOptions } />
                <Tab.Screen name="HospitalsNavigation" component={ HospitalsNavigation } options={ HospitalsOptions } />
                <Tab.Screen name="HealthkardsNavigation" component={ HealthkardsNavigation } options={ HealthkardsOptions } />
                <Tab.Screen name="ProfileNavigation" component={ ProfileNavigation } options={ ProfileOptions } />
            </Tab.Navigator>
        </UserSharedDataProvider>
    );
};

export const HealthkardsNavigation = () => {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName="Healthkards">
            <Stack.Screen name="Healthkards" component={ Healthkards } />
            <Stack.Screen name="Healthkard" component={ Healthkard } />
            <Stack.Screen name="NewKard" component={ NewKard } />
            <Stack.Screen name="Renewal" component={ Renewal } />
            <Stack.Screen name='Pay' component={ Payment } />
        </Stack.Navigator>
    );
};

export const HospitalsNavigation = () => {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName="Hospitals">
            <Stack.Screen name="Hospitals" component={ Hospitals } />
            <Stack.Screen name="Hospital" component={ Hospital } />
        </Stack.Navigator>
    );
};

export const ProfileNavigation = () => {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } } initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ Profile } />
            <Stack.Screen name="RenewalHistory" component={ RenewalHistory } />
            <Stack.Screen name="Feedback" component={ HelpAndFeedback } />
            <Stack.Screen name="TermsAndCondition" component={ TermsAndCondition } />
        </Stack.Navigator>
    )
}
