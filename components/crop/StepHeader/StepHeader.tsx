import { useTranslation } from 'react-i18next';

import { IconButton, Text } from '@/components/ui';
import type { TxKey } from '@/i18n/types';
import {
  Dot,
  DotsRow,
  HeaderContainer,
  Spacer,
  TitleGroup,
  TopRow,
} from './StepHeader.styles';

export type StepHeaderProps = {
  step: number;
  totalSteps: number;
  titleTx: TxKey;
  subtitleTx?: TxKey;
  subtitleValues?: Record<string, string | number>;
  onClose?: () => void;
  onBack?: () => void;
};

export function StepHeader({
  step,
  totalSteps,
  titleTx,
  subtitleTx,
  subtitleValues,
  onClose,
  onBack,
}: StepHeaderProps) {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <TopRow>
        {onBack ? (
          <IconButton
            icon="chevron-back"
            accessibilityLabel={t('common.back')}
            onPress={onBack}
          />
        ) : (
          <Spacer />
        )}
        <Text
          variant="label"
          tone="muted"
          tx="common.stepIndicator"
          txValues={{ step, total: totalSteps }}
        />
        {onClose ? (
          <IconButton
            icon="close"
            accessibilityLabel={t('common.close')}
            onPress={onClose}
          />
        ) : (
          <Spacer />
        )}
      </TopRow>

      <DotsRow>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Dot key={index} state={index < step ? 'active' : 'inactive'} />
        ))}
      </DotsRow>

      <TitleGroup>
        <Text variant="title" tx={titleTx} />
        {subtitleTx ? (
          <Text tone="muted" tx={subtitleTx} txValues={subtitleValues} />
        ) : null}
      </TitleGroup>
    </HeaderContainer>
  );
}
