import { View } from 'react-native';

import { styled } from '@/components/ui/styled';

export const HeaderContainer = styled(View, { base: 'gap-3 py-2' });

export const TopRow = styled(View, {
  base: 'h-11 flex-row items-center justify-between',
});

export const Spacer = styled(View, { base: 'h-11 w-11' });

export const DotsRow = styled(View, { base: 'flex-row gap-1.5' });

export const Dot = styled(View, {
  base: 'h-1.5 flex-1 rounded-full',
  variants: {
    state: {
      active: 'bg-primary-600',
      inactive: 'bg-neutral-200 dark:bg-neutral-800',
    },
  },
  defaultVariants: { state: 'inactive' },
});

export const TitleGroup = styled(View, { base: 'gap-0.5' });
