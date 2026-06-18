import { Stack } from 'expo-router';

import { useThemeColors } from '@/hooks/theme';

export default function CropLayout() {
  const { colors } = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
