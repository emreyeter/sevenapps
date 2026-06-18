import { type ReactNode, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { type Edge } from 'react-native-safe-area-context';

import type { TxKey } from '@/i18n/types';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { Footer, HeaderBar, HeaderSlot, ScreenSafeArea } from './Screen.styles';

export type ScreenHeaderConfig = {
  titleTx?: TxKey;
  title?: string;
  onBack?: () => void;
  backIcon?: 'chevron-back' | 'close';
  backLabel?: string;
  right?: ReactNode;
};

export type ScreenProps = {
  children: ReactNode;
  header?: ScreenHeaderConfig;
  keyboardAvoiding?: boolean;
  padded?: boolean;
  footer?: ReactNode;
  edges?: readonly Edge[];
  safeArea?: boolean;
};

function ScreenHeader({
  titleTx,
  title,
  onBack,
  backIcon = 'chevron-back',
  backLabel = 'Back',
  right,
}: ScreenHeaderConfig) {
  return (
    <HeaderBar>
      <HeaderSlot align="start">
        {onBack ? (
          <IconButton icon={backIcon} accessibilityLabel={backLabel} onPress={onBack} />
        ) : null}
      </HeaderSlot>
      <Text variant="subtitle" tx={titleTx} numberOfLines={1} className="flex-1 text-center">
        {titleTx ? undefined : title}
      </Text>
      <HeaderSlot align="end">{right}</HeaderSlot>
    </HeaderBar>
  );
}

export function Screen({
  children,
  header,
  keyboardAvoiding = false,
  padded = true,
  footer,
  edges = ['top', 'bottom'],
  safeArea = true,
}: ScreenProps) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const scrollEnabled = contentHeight > viewportHeight + 1;

  const body = (
    <ScrollView
      className="flex-1"
      contentContainerClassName={padded ? 'grow px-5' : 'grow'}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={scrollEnabled}
      keyboardShouldPersistTaps="handled"
      onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
      onContentSizeChange={(_, height) => setContentHeight(height)}>
      {children}
    </ScrollView>
  );

  const inner = (
    <>
      {header ? <ScreenHeader {...header} /> : null}
      {body}
      {footer ? <Footer>{footer}</Footer> : null}
    </>
  );

  const content = keyboardAvoiding ? (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {inner}
    </KeyboardAvoidingView>
  ) : (
    inner
  );

  if (!safeArea) {
    return <View className="flex-1">{content}</View>;
  }

  return <ScreenSafeArea edges={edges}>{content}</ScreenSafeArea>;
}
