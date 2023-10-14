import { useState } from 'react';
import Image from 'next/image';
import Loading from '../atoms/Loading';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface IProps {
  title: string;
  images: string[];
}

const ProductImage = ({ images, title }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images.length) {
    return <Loading />; // 혹은 다른 적절한 대체 컨텐츠
  }

  return (
    <>
      <div className='relative mt-2 mb-8 bg-black rounded-lg w-160 h-128'>
        <button onClick={handlePrev} className='absolute text-5xl rounded-lg top-1/2 -left-20 text-sky hover:text-white hover:bg-sky'>
          <BiChevronLeft />
        </button>
        <Image src={images[currentIndex]} alt={`Image${title}}`} layout="fill" objectFit='cover' className='rounded-lg' quality={100} />
        <button onClick={handleNext} className='absolute text-5xl rounded-lg top-1/2 -right-20 text-sky hover:text-white hover:bg-sky'>
          <BiChevronRight />
        </button>
      </div>
      <div className="bottom-2.5 flex space-x-4 justify-center">
        {images.map((img, index) => (
          currentIndex === index
            ? <div 
                key={index}
                className='w-4 h-4 rounded-full bg-sky'
              />
            : <div 
                key={index}
                className='w-4 h-4 border rounded-full border-sky'
              />
        ))}
      </div>
    </>
  );
}

export default ProductImage;