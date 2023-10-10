import { ComponentMeta } from '@storybook/react';
import TypoH1 from '../components/atoms/TypoH1';

export default {
  title: 'TypoH1',
  component: TypoH1,
} as ComponentMeta<typeof TypoH1>;

export const TypoHead1 = (props: any) => {
  return(
    <TypoH1 {...props} title='title' />
  )
}