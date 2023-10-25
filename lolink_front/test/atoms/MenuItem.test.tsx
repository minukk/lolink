import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuItem from '../../components/atoms/MenuItem';

describe('<MenuItem />', () => {
  it('텍스트가 정상적으로 렌더링되는지 확인', () => {
    render(<MenuItem text="메뉴 아이템" />);
    const menuItem = screen.getByText('메뉴 아이템');
    expect(menuItem).toBeInTheDocument();
  });

  it('href prop이 주어진 경우, 링크의 href 속성이 올바른지 확인', () => {
    render(<MenuItem text="메뉴 아이템" href="test" />);
    const menuItemLink = screen.getByRole('link', { name: /메뉴 아이템/ });
    expect(menuItemLink).toHaveAttribute('href', '/test');
  });
});
