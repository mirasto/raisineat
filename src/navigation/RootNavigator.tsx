import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { DashboardNavigator } from './DashboardNavigator';

export const RootNavigator = () => {
  const isAuthorized = true;

  return (
    <NavigationContainer>
      {isAuthorized ? <DashboardNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
