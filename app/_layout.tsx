import '@/global.css';
import '@/lib/cssInterop';
import '@/i18n';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { db } from '@/api/client';
import { queryClient } from '@/api/queryClient';
import { Center, EmptyState, Spinner, ToastProvider } from '@/components/ui';
import { COLOR_SCHEMES } from '@/constants/colorScheme';
import migrations from '@/drizzle/migrations';
import { useThemeColors } from '@/hooks/theme';

function DatabaseGate({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <EmptyState
        icon="warning-outline"
        titleTx="library.errorTitle"
        descriptionTx="library.errorDescription"
      />
    );
  }

  if (!success) {
    return (
      <Center>
        <Spinner size="large" />
      </Center>
    );
  }

  return <>{children}</>;
}

function Navigation() {
  const { scheme, colors } = useThemeColors();
  const { t } = useTranslation();

  return (
    <NavigationThemeProvider
      value={scheme === COLOR_SCHEMES.DARK ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ title: t('common.appName') }} />
        <Stack.Screen
          name="(crop)"
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen name="video/[id]/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="video/[id]/edit"
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen name="+not-found" options={{ title: t('notFound.title') }} />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DatabaseGate>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <Navigation />
            </ToastProvider>
          </QueryClientProvider>
        </DatabaseGate>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
