import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';

import { MetadataStep, SelectStep, StepHeader, TrimStep } from '@/components/crop';
import { SafeArea } from '@/components/ui';
import type { TxKey } from '@/i18n/types';
import { useCropStore } from '@/store/cropStore';

const STEP_META: Record<number, { titleTx: TxKey; subtitleTx: TxKey }> = {
  1: { titleTx: 'crop.selectTitle', subtitleTx: 'crop.selectSubtitle' },
  2: { titleTx: 'crop.trimTitle', subtitleTx: 'crop.trimSubtitle' },
  3: { titleTx: 'crop.metaTitle', subtitleTx: 'crop.metaSubtitle' },
};

export default function CropFlow() {
  const router = useRouter();
  const reset = useCropStore((state) => state.reset);
  const segmentSec = useCropStore((state) => state.segmentSec);
  const [step, setStep] = useState(1);
  const directionRef = useRef<'forward' | 'back'>('forward');
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    reset();
  }, [reset]);

  const goTo = useCallback(
    (next: number) => {
      directionRef.current = next >= step ? 'forward' : 'back';
      hasNavigatedRef.current = true;
      setStep(next);
    },
    [step],
  );

  const close = useCallback(() => {
    reset();
    router.back();
  }, [reset, router]);

  const entering = directionRef.current === 'forward' ? SlideInRight : SlideInLeft;
  const meta = STEP_META[step];
  const animatedEntering = hasNavigatedRef.current
    ? entering.duration(240)
    : undefined;

  return (
    <SafeArea edges={['top', 'bottom']}>
      <View className="px-5">
        <StepHeader
          step={step}
          totalSteps={3}
          titleTx={meta.titleTx}
          subtitleTx={meta.subtitleTx}
          subtitleValues={step === 2 ? { seconds: Math.round(segmentSec) } : undefined}
          onBack={step > 1 ? () => goTo(step - 1) : undefined}
          onClose={close}
        />
      </View>

      <Animated.View key={step} entering={animatedEntering} className="flex-1">
        {step === 1 ? (
          <SelectStep onNext={() => goTo(2)} />
        ) : step === 2 ? (
          <TrimStep onNext={() => goTo(3)} />
        ) : (
          <MetadataStep />
        )}
      </Animated.View>
    </SafeArea>
  );
}
