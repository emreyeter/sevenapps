import { Pressable, View } from 'react-native';

import { styled } from '@/components/ui/styled';

export const ItemRow = styled(Pressable, {
  base: 'flex-row items-center gap-3.5 rounded-2xl border border-neutral-200/70 bg-white p-3 active:opacity-90 dark:border-neutral-800 dark:bg-neutral-900',
});

export const ItemInfo = styled(View, { base: 'flex-1 gap-0.5' });

export const DeleteAction = styled(Pressable, {
  base: 'absolute inset-0 items-center justify-center rounded-2xl bg-danger active:opacity-80',
});
