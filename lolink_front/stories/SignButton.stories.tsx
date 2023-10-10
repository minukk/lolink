import { ComponentMeta } from '@storybook/react';
import SignButton from '../components/atoms/Button';

export default {
  title: 'SignButton',
  component: SignButton,
} as ComponentMeta<typeof SignButton>;

export const GreenSignButton = (props: any) => {
  return (
    <SignButton {...props} color='green' title='버튼' />
  )
}

export const RedSignButton = (props: any) => {
  return (
    <SignButton {...props} color='red' title='버튼' />
  )
}