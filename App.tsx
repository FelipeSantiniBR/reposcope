import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/presentation/queryClient';
import { SearchScreen } from './src/presentation/screens/SearchScreen';
import { DataSourceProvider } from './src/infrastructure/di/DataSourceProvider';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider>
        <SearchScreen />
      </DataSourceProvider>
    </QueryClientProvider>
  );
}
