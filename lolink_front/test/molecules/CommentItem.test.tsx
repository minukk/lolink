import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentItem from '../../Components/Molecules/CommentItem';
import { displayCreatedAt } from '../../utils/dateForm';

jest.mock('../../utils/dateForm', () => ({
  displayCreatedAt: jest.fn()
}));

describe('<CommentItem />', () => {
  beforeEach(() => {
    (displayCreatedAt as jest.Mock).mockReturnValue('변환된 시간');
  });

  it('content가 정상적으로 렌더링되는지 확인', () => {
    const testContent = '테스트 댓글 내용';
    render(<CommentItem content={testContent} createdAt="2023-10-10T10:00:00Z" />);
    
    const contentElement = screen.getByText(testContent);
    expect(contentElement).toBeInTheDocument();
  });

  it('createdAt가 displayCreatedAt 함수를 통해 처리된 후 올바르게 표시되는지 확인', () => {
    const testDate = '2023-10-10T10:00:00Z';
    render(<CommentItem content="테스트 댓글 내용" createdAt={testDate} />);
    
    const dateElement = screen.getByText('변환된 시간');
    expect(dateElement).toBeInTheDocument();
    expect(displayCreatedAt).toHaveBeenCalledWith(testDate);
  });
});
