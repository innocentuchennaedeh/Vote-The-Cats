import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="index" options={{ title: 'Vote The Cats' }} />
        <Stack.Screen name="upload" options={{ title: 'Upload a Cat', presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;