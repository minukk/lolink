import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../components/Atoms/Button';

describe('<Button />', () => {
  it('기본값으로 버튼이 정상적으로 렌더링되는지 확인', () => {
    render(<Button>버튼</Button>);
    const button = screen.getByText('버튼');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-primary');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('border-primary');
  });

  it('color prop에 따라서 스타일이 변경되는지 확인', () => {
    render(<Button color="sign">버튼</Button>);
    const button = screen.getByText('버튼');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('bg-green');
  });

  it('size prop에 따라서 스타일이 변경되는지 확인', () => {
    render(<Button size="small">버튼</Button>);
    const button = screen.getByText('버튼');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('text-sm');
  });

  it('disabled 상태일 때 스타일 및 속성이 적용되는지 확인', () => {
    render(<Button disabled>버튼</Button>);
    const button = screen.getByText('버튼');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('onClick 이벤트 핸들러가 정상적으로 동작하는지 확인', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);
    const button = screen.getByText('버튼');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aria-label이 정상적으로 적용되는지 확인', () => {
    render(<Button label="테스트 버튼">버튼</Button>);
    expect(screen.getByLabelText('테스트 버튼')).toBeInTheDocument();
  });
});
