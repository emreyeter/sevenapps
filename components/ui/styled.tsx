import { type ComponentProps, type ComponentType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

type TVConfig = Parameters<typeof tv>[0];

export function styled<C extends ComponentType<any>, T extends TVConfig>(
  Component: C,
  config: T,
) {
  const variants = tv(config);
  const variantKeys = config.variants ? Object.keys(config.variants) : [];
  const Cmp = Component as ComponentType<Record<string, unknown>>;

  type Props = Omit<ComponentProps<C>, keyof VariantProps<typeof variants>> &
    VariantProps<typeof variants> & { className?: string };

  function Styled(props: Props) {
    const variantValues: Record<string, unknown> = {};
    const rest: Record<string, unknown> = {};

    Object.entries(props as Record<string, unknown>).forEach(([key, value]) => {
      if (variantKeys.includes(key)) {
        variantValues[key] = value;
      } else {
        rest[key] = value;
      }
    });

    const { className, ...componentProps } = rest;
    const composed = variants({ ...variantValues, className } as never);

    return <Cmp {...componentProps} className={composed} />;
  }

  Styled.displayName = `Styled(${Component.displayName ?? Component.name ?? 'Component'})`;
  return Styled;
}
