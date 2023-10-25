import { render } from '@testing-library/react';
import { useQuery } from 'react-query';
import ProductBox from '../../components/molecules/ProductBox';

// Mock 처리
jest.mock('next/image', () => {
  return () => <img />;
});

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../pages/api/user', () => ({
  getUserInfo: jest.fn(),
}));

describe('<ProductBox />', () => {
  let mockItem;

  beforeEach(() => {
    // 세션 및 초기 상태 설정
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn(() => null),
      },
      writable: true
    });

    mockItem = {
      id: 1,
      title: '상품제목',
      createdAt: new Date().toISOString(),
      nickname: '사용자',
      location: '서울',
      location_detail: '강남구',
      like: 10,
      price: 10000,
      imageUrls: '/path/to/image1.jpg',
    };

    useQuery.mockReturnValue({
      data: null,
      isLoading: false
    });
  });

  it('제품 정보가 올바르게 렌더링되는지 확인', () => {
    const { getByText } = render(<ProductBox {...mockItem} />);

    expect(getByText('상품제목')).toBeInTheDocument();
    expect(getByText('사용자')).toBeInTheDocument();
    expect(getByText('서울')).toBeInTheDocument();
    expect(getByText('강남구')).toBeInTheDocument();
    expect(getByText('10,000 원')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });

  // "isLike" 상태, 이미지 유무 등에 따른 추가적인 테스트 케이스를 작성
});
