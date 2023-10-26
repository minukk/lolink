import React from 'react';
import { render, screen } from '@testing-library/react';
import TopPost from '../../Components/Organisms/TopPost';

describe('TopPost 컴포넌트', () => {
  it('인기글과 최신글 텍스트가 올바르게 표시됩니다', () => {
    render(<TopPost />);

    expect(screen.getByText('인기글')).toBeInTheDocument();
    expect(screen.getByText('최신글')).toBeInTheDocument();
  });

  // 옵셔널: Typograph 컴포넌트 사용 여부를 확인하는 테스트
  it('Typograph 컴포넌트가 올바르게 사용되었습니다', () => {
    const { container } = render(<TopPost />);
    const typographElements = container.querySelectorAll('h3');

    expect(typographElements.length).toBe(2); // 두 개의 h3 태그가 있어야 함
    expect(typographElements[0].textContent).toBe('인기글');
    expect(typographElements[1].textContent).toBe('최신글');
  });
});
