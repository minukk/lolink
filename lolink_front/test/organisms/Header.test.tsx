import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Header from '../../components/organisms/Header';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    })
}));

describe('<Header />', () => {
  it('컴포넌트가 올바르게 렌더링되는지 확인', () => {
    const { getByText, getByTestId } = render(<Header />);

    expect(getByText('LoLink')).toBeInTheDocument();
    expect(getByText('커뮤니티')).toBeInTheDocument();
    expect(getByText('중고 거래')).toBeInTheDocument();
    // expect(getByText('스포츠')).toBeInTheDocument();

    expect(getByTestId('chat-icon')).toBeInTheDocument();
    expect(getByTestId('user-icon')).toBeInTheDocument();
    expect(getByTestId('menu-icon')).toBeInTheDocument();
  });
});
