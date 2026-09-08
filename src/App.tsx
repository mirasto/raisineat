import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '@/navigation';
import { store } from '@/store';
import { ErrorBoundary } from '@/shared/ui';

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
};
