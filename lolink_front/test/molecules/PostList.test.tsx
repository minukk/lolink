import { render } from '@testing-library/react';
import PostList from '../../Components/Molecules/PostList';

describe('<PostList />', () => {
  const mockItem = {
    id: '1',
    title: '테스트 제목',
    createdAt: '2023-10-10T10:10:10.000Z',
    nickname: '사용자명',
    views: 100,
    recommend: 10,
    category: '카테고리명'
  };

  it('컴포넌트가 올바르게 렌더링되는지 확인', () => {
    const { getByText } = render(<PostList {...mockItem} />);
    
    const linkElement = getByText('테스트 제목').closest('a');
    expect(linkElement).toHaveAttribute('href', '/posts/1');
  });

  it('제공된 title이 정상적으로 출력되는지 확인', () => {
    const { getByText } = render(<PostList {...mockItem} />);
    expect(getByText('테스트 제목')).toBeInTheDocument();
  });

  it('제공된 createdAt의 날짜 형식이 올바르게 출력되는지 확인', () => {
    const { getByText } = render(<PostList {...mockItem} />);
    expect(getByText('2023/10/10')).toBeInTheDocument();
    expect(getByText('19:10')).toBeInTheDocument();
  });
});
