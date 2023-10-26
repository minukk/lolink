import { render, screen } from '@testing-library/react';
import MainImage from '../../Components/Atoms/MainImage';

describe('<MainImage />', () => {
  it('정상적으로 렌더링 되는지 확인', () => {
    render(<MainImage />);
    
    // 특정 텍스트가 화면에 나타나는지 확인합니다.
    expect(screen.getByText(/지금 여러분의/)).toBeInTheDocument();
    expect(screen.getByText(/주변과 LINK하세요!/)).toBeInTheDocument();
  });
});