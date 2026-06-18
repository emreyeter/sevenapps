import { Ionicons } from '@expo/vector-icons';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColors } from '@/hooks/theme';
import type { SemanticColors } from '@/constants/theme';
import { Text } from '../Text';
import { ToastBody, ToastCard, ToastLayer } from './Toast.styles';

export type ToastType = 'success' | 'error' | 'info';

type ToastOptions = {
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

type ToastItem = ToastOptions & { id: string; type: ToastType };

type ToastContextValue = {
  show: (options: ToastOptions) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const iconByType: Record<ToastType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  info: 'information-circle',
};

function colorByType(colors: SemanticColors, type: ToastType): string {
  const map: Record<ToastType, string> = {
    success: colors.success,
    error: colors.danger,
    info: colors.primary,
  };
  return map[type];
}

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 6,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColors();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback(
    ({ type = 'info', title, message, duration = 3000 }: ToastOptions) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (title, message) => show({ type: 'success', title, message }),
      error: (title, message) => show({ type: 'error', title, message }),
      info: (title, message) => show({ type: 'info', title, message }),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastLayer pointerEvents="box-none" style={{ top: insets.top + 8 }}>
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            entering={FadeInDown.duration(240)}
            exiting={FadeOut.duration(160)}
            layout={LinearTransition.duration(200)}
            style={shadow}>
            <Ionicons
              name={iconByType[toast.type]}
              size={22}
              color={colorByType(colors, toast.type)}
            />
            <ToastBody>
              <Text variant="label">{toast.title}</Text>
              {toast.message ? (
                <Text variant="caption" tone="muted">
                  {toast.message}
                </Text>
              ) : null}
            </ToastBody>
          </ToastCard>
        ))}
      </ToastLayer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
