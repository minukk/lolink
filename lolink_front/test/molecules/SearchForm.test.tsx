import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from '../../Components/Molecules/SearchForm';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('<SearchForm />', () => {
  let pushMock = jest.fn();

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it('입력 필드가 올바르게 렌더링됩니다', () => {
    render(<SearchForm />);
    expect(screen.getByPlaceholderText('검색어를 입력하세요.')).toBeInTheDocument();
  });

  it('Enter 키로 검색을 시도할 수 있습니다', () => {
    render(<SearchForm />);
    const inputElement = screen.getByPlaceholderText('검색어를 입력하세요.');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(pushMock).toHaveBeenCalledWith('/search?query=test');
  });

  it('검색 버튼으로 검색을 시도할 수 있습니다', () => {
    render(<SearchForm />);
    const inputElement = screen.getByPlaceholderText('검색어를 입력하세요.');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button'));
    expect(pushMock).toHaveBeenCalledWith('/search?query=test');
  });

  it('검색어가 2자 미만일 때 에러 메시지를 표시합니다', () => {
    render(<SearchForm />);
    const inputElement = screen.getByPlaceholderText('검색어를 입력하세요.');
    fireEvent.change(inputElement, { target: { value: 't' } });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('검색어는 2자 이상이어야 합니다.')).toBeInTheDocument();
  });

  it('검색어에 특수 문자가 포함되어 있으면 에러 메시지를 표시합니다', () => {
    render(<SearchForm />);
    const inputElement = screen.getByPlaceholderText('검색어를 입력하세요.');
    fireEvent.change(inputElement, { target: { value: 'test@' } });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('검색어는 특수 문자를 포함할 수 없습니다.')).toBeInTheDocument();
  });
});
