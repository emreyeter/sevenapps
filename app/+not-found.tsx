import { Link } from 'expo-router';

import { Center, Screen, Text } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <Screen>
      <Center className="gap-4">
        <Text variant="title" tx="notFound.title" />
        <Link href="/">
          <Text tone="primary" variant="label" tx="notFound.action" />
        </Link>
      </Center>
    </Screen>
  );
}
