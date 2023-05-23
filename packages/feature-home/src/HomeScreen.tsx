import { Paragraph, Strong } from '@autotoor/ui';
import { ComponentProps } from 'react';

type HomeScreenProps = ComponentProps<typeof Paragraph>;

export const HomeScreen = (props: HomeScreenProps) => (
  <Paragraph {...props}>
    Hello from an <Strong>Expo monorepo</Strong>!
  </Paragraph>
);
