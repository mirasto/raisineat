import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../../features/authentication/screens/Splash';
import Login from '../../features/authentication/screens/Login/Login';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthenticationNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigation;
