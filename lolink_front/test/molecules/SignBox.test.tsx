import React from 'react';
import { useRouter } from 'next/router';
import { render, fireEvent, screen } from '@testing-library/react';
import SignBox from '../../Components/Molecules/SignBox';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('<SignBox />', () => {
  let mockOnChangeSign = jest.fn();
  let mockOnSign = jest.fn();

  beforeEach(() => {
    mockOnChangeSign = jest.fn();
    mockOnSign = jest.fn();
    window.HTMLFormElement.prototype.requestSubmit = jest.fn();
  });

  it('로그인 페이지일 경우 로그인 텍스트가 표시됩니다', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/signin',
    });

    render(<SignBox sign={{ email: '', password: '' }} onChangeSign={mockOnChangeSign} onSign={mockOnSign} />);
    expect(screen.getByRole('heading', { level: 2, name: '로그인' })).toBeInTheDocument();
    expect(screen.getByText('회원가입 이동')).toBeInTheDocument();
  });

  it('회원가입 페이지일 경우 회원가입 텍스트가 표시됩니다', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/signup',
    });

    render(<SignBox sign={{ email: '', password: '', nickname: '', phone: '' }} onChangeSign={mockOnChangeSign} onSign={mockOnSign} />);
    expect(screen.getByRole('heading', { level: 2, name: '회원가입' })).toBeInTheDocument();
    expect(screen.getByText('로그인 이동')).toBeInTheDocument();
  });

  it('입력 값 변경시 onChangeSign 콜백이 호출됩니다', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/signup',
    });

    render(<SignBox sign={{ email: '', password: '', nickname: '', phone: '' }} onChangeSign={mockOnChangeSign} onSign={mockOnSign} />);
    
    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(mockOnChangeSign).toHaveBeenCalledWith(expect.anything(), 'email');
  });

  // it('로그인 또는 회원가입 버튼 클릭시 onSign 콜백이 호출됩니다', () => {
  //   (useRouter as jest.Mock).mockReturnValue({
  //     pathname: '/signin',
  //   });

  //   render(<SignBox sign={{ email: '', password: '' }} onChangeSign={mockOnChangeSign} onSign={mockOnSign} />);
    
  //   const signInButton = screen.getByLabelText('로그인');
  //   fireEvent.click(signInButton);
  //   expect(mockOnSign).toHaveBeenCalled();
  // });
});
