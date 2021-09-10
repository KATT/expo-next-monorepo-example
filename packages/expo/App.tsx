import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DripsyProvider } from 'dripsy';
import { theme } from 'app/theme';
import { HelloWorld } from 'app/hello-world';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from 'app/trpc';
enableScreens(true);
import Constants from 'expo-constants';
import superjson from 'superjson';
const { manifest } = Constants;

const localhost = `http://${manifest.debuggerHost?.split(':').shift()}:3000`;

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: `${localhost}/api/trpc`,

      async headers() {
        return {};
      },
      transformer: superjson
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <DripsyProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <HelloWorld />
          </SafeAreaProvider>
        </DripsyProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
