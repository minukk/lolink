import { render } from '@testing-library/react';
import HashtagInput from '../../components/atoms/HashtagInput';

describe('<HashtagInput />', () => {
  it('컴포넌트가 올바르게 렌더링되는지 확인', () => {
    const { getByPlaceholderText } = render(<HashtagInput />);

    const inputElement = getByPlaceholderText('해시태그를 입력해주세요.');
    expect(inputElement).toBeInTheDocument();
  });

  it('해시태그 placeholder가 올바른지 확인', () => {
    const { getByPlaceholderText } = render(<HashtagInput />);
    
    expect(getByPlaceholderText('해시태그를 입력해주세요.')).toBeTruthy();
  });
});
