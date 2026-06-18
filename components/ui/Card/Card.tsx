import { type ViewProps } from 'react-native';

import { CardRoot } from './Card.styles';

export type CardProps = ViewProps & { className?: string };

export function Card(props: CardProps) {
  return <CardRoot {...props} />;
}
