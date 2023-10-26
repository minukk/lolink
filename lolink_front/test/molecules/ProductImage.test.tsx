import { render, fireEvent } from '@testing-library/react';
import ProductImage from '../../Components/Molecules/ProductImage';

describe('<ProductImage />', () => {
  const sampleImages = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg'
  ];

  // it('이미지 목록이 없을 때 대체 이미지가 렌더링되는지 확인', () => {
  //   const { getByText } = render(<ProductImage title="Sample" images={[]} />);
  //   expect(getByText(/l/i)).toBeInTheDocument();
  // });

  it('버튼 클릭으로 이미지가 전환되는지 확인', () => {
    const { getByAltText, getByLabelText } = render(<ProductImage title="Sample" images={sampleImages} />);

    const leftButton = getByLabelText('left');
    const rightButton = getByLabelText('right');
    const currentImage = getByAltText('Sample-Image-1');

    fireEvent.click(rightButton);
    expect(currentImage).toHaveAttribute('alt', 'Sample-Image-2');
    // 이미지 URL이나 alt 속성을 확인하여 이미지가 바뀌었는지 확인할 수 있습니다.
    // 이 예제에서는 alt 속성이 변하지 않기 때문에 실제로 이미지가 바뀌었는지 확인하는 로직을 추가해야 합니다.

    fireEvent.click(leftButton);
    // 마찬가지로 이미지가 바뀌었는지 확인하는 로직을 추가해야 합니다.
    expect(currentImage).toHaveAttribute('alt', 'Sample-Image-1');
  });

  // it('하단 이미지 인덱스 표시가 올바르게 렌더링되는지 확인', () => {
  //   const { getAllByRole } = render(<ProductImage title="Sample" images={sampleImages} />);

  //   const indicators = getAllByRole('presentation'); 
  //   expect(indicators).toHaveLength(sampleImages.length);
  //   // 첫 번째 이미지가 활성화된 상태이므로, 첫 번째 인디케이터만 배경색이 있어야 합니다.
  //   expect(indicators[0]).toHaveClass('bg-sky');
  // });
});
