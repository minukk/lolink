import { render, fireEvent } from '@testing-library/react';
import MenuBar from '../../Components/Molecules/MenuBar';
import { userState } from '@/stores/user';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../stores/user');
const queryClient = new QueryClient();

describe('<MenuBar />', () => {
  let mockSetShowAlert;
  
  beforeEach(() => {
    mockSetShowAlert = jest.fn();
    (userState as jest.Mock).mockReturnValue({
      state: null,
      setState: jest.fn(),
    });
  });

  it('컴포넌트가 올바르게 렌더링되는지 확인', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MenuBar setShowAlert={mockSetShowAlert} />
      </QueryClientProvider>
    );
    
    const loginMenuItem = getByText('로그인');
    expect(loginMenuItem).toBeInTheDocument();
  });

  it('로그아웃 버튼 클릭 시 처리 테스트', () => {
    (userState as jest.Mock).mockReturnValue({
      state: { someUserDetail: 'user1' },
      setState: jest.fn(),
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MenuBar setShowAlert={mockSetShowAlert} />
      </QueryClientProvider>
    );
    
    const logoutMenuItem = getByText('로그아웃');
    fireEvent.click(logoutMenuItem);

    expect(mockSetShowAlert).toHaveBeenCalledWith(true);
  });

  it('로그인 상태에 따른 메뉴 아이템 표시 테스트', () => {
    (userState as jest.Mock).mockReturnValue({
      state: { someUserDetail: 'user1' },
      setState: jest.fn(),
    });

    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <MenuBar setShowAlert={mockSetShowAlert} />
      </QueryClientProvider>
    );
    
    expect(getByText('로그아웃')).toBeInTheDocument();
    expect(queryByText('로그인')).toBeNull();
  });
});
