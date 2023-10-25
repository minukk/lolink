import React from 'react';
import { render, screen } from '@testing-library/react';
import Typograph from '../../components/atoms/Typograph';

describe('<Typograph />', () => {
  it('정상적으로 h1 태그가 렌더링되는지 확인', () => {
    render(<Typograph tag="h1">테스트</Typograph>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('테스트');
  });

  it('정상적으로 h2 태그가 렌더링되는지 확인', () => {
    render(<Typograph tag="h2">테스트</Typograph>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('테스트');
  });

  it('정상적으로 h3 태그가 렌더링되며, secondary 클래스가 적용되는지 확인', () => {
    render(<Typograph tag="h3" secondary>테스트</Typograph>);
    const element = screen.getByRole('heading', { level: 3 });
    expect(element).toHaveTextContent('테스트');
    expect(element).toHaveClass('text-3xl');
    expect(element).toHaveClass('font-bold');
    expect(element).toHaveClass('rounded-lg');
    expect(element).toHaveClass('bg-sky');
    expect(element).toHaveClass('text-white');
  });

  it('정상적으로 h4 태그가 렌더링되는지 확인', () => {
    render(<Typograph tag="h4">테스트</Typograph>);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('테스트');
  });

  it('정상적으로 p 태그가 렌더링되는지 확인', () => {
    render(<Typograph tag="p">테스트</Typograph>);
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });

  it('정상적으로 span 태그가 렌더링되는지 확인', () => {
    render(<Typograph tag="span">테스트</Typograph>);
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });
});

