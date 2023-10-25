import { render, fireEvent } from '@testing-library/react';
import SignInput from '../../components/atoms/SignInput';

describe('<SignInput />', () => {
  it('컴포넌트가 올바르게 렌더링되는지 확인', () => {
    const { getByPlaceholderText } = render(
      <SignInput type="text" text="텍스트" value="" category="test" onchange={() => {}} />
    );

    const inputElement = getByPlaceholderText('텍스트');
    expect(inputElement).toBeInTheDocument();
  });

  it('onChange 이벤트가 제대로 작동하는지 확인', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SignInput type="text" text="텍스트" value="" category="test" onchange={handleChange} />
    );

    const inputElement = getByPlaceholderText('텍스트');
    fireEvent.change(inputElement, { target: { value: '새로운 텍스트' } });

    expect(handleChange).toHaveBeenCalled();
    // category 값이 올바르게 전달되는지도 확인
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), 'test');
  });
});
