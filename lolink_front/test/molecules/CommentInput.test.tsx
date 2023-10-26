import React from 'react';
import { useRouter } from 'next/router';
import { render, fireEvent, screen } from '@testing-library/react';
import { useCommentMutation } from '../../pages/api/comment';
import { userState } from '../../stores/user';
import CommentInput from '../../Components/Molecules/CommentInput';

// Mocks
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../stores/user', () => ({
  userState: jest.fn(),
}));

jest.mock('../../pages/api/comment', () => ({
  useCommentMutation: jest.fn(),
}));

describe('CommentInput', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { postId: ['1'] },
    });
    (userState as jest.Mock).mockReturnValue({
      state: { id: 'testId' },
    });
    (useCommentMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('renders correctly', () => {
    render(<CommentInput />);
    expect(screen.getByPlaceholderText('댓글을 입력해주세요!')).toBeInTheDocument();
  });

  it('handles input change', () => {
    render(<CommentInput />);
    const input = screen.getByPlaceholderText('댓글을 입력해주세요!');
    fireEvent.change(input, { target: { value: '새 댓글' } });
    expect(input.value).toBe('새 댓글');
  });

  // it('calls onCreateComment when Enter is pressed', () => {
  //   render(<CommentInput />);
  //   const input = screen.getByPlaceholderText('댓글을 입력해주세요!');
  //   const comment = {
  //     content: '새 댓글',
  //     userId: 'testId',
  //     postId: '1',
  //   };
  //   fireEvent.keyDown(input, { key: 'Enter', nativeEvent: { isComposing: false } });

  //   expect(useCommentMutation().mutate).toHaveBeenCalled();
  // });

  // it('shows alert when required information is missing', () => {
  //   (userState as jest.Mock).mockReturnValue({ state: null });
  //   render(<CommentInput />);
  //   const button = screen.getByText('확인');
  //   fireEvent.click(button);
  //   expect(screen.getByText('로그인 후 댓글을 입력해주세요.')).toBeInTheDocument();
  // });
});
