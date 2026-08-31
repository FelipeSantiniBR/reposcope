import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/presentation/queryClient';
import { RootNavigator } from './src/presentation/navigation/RootNavigator';
import { DataSourceProvider } from './src/infrastructure/di/DataSourceProvider';
import { ThemeProvider } from './src/presentation/theme/ThemeProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DataSourceProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </DataSourceProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
