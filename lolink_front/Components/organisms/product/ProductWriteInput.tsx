import React from 'react'
import Typograph from '../../atoms/Typograph'
import LocationInput from '../../molecules/LocationInput'
import { BiHash } from 'react-icons/bi'

interface ProductWriteInputProps {
  location: { location: string; locationDetail: string; };
  setLocation: React.Dispatch<React.SetStateAction<{ location: string; locationDetail: string; }>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  handlePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hashtag: string;
  setHashtag: React.Dispatch<React.SetStateAction<string>>;
  removeHashtag: (hashtag: string) => void;
}

const ProductWriteInput: React.FC<ProductWriteInputProps> = ({ location, setLocation, price, setPrice, hashtags, setHashtags, hashtag, setHashtag, removeHashtag }) => {
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = Number(e.target.value);
    setPrice(() => inputPrice);
  }

  const handleHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }

  const handleHashtags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (hashtags.length < 5) {
        setHashtags((prev: string[]) => [...prev, hashtag]);
      }
      setHashtag('');
    }
  }

  return (
    <>
      <div className=''>
        <div className='my-2'>
          <Typograph tag='h4'>지역을 선택해주세요.</Typograph>
        </div>
        <LocationInput location={location} setLocation={setLocation}/>
      </div>
      <div className='my-2'>
        <Typograph tag='h4'>가격을 입력해주세요.</Typograph>
      </div>
        <div className='mb-4 border-2 rounded-lg border-sky'>
          <input className='p-2 outline-none appearance-none' type='number' placeholder='가격을 입력해주세요.' onChange={handlePrice} pattern='[0-9]+'/>
        </div>
      <div className='flex justify-center text-gray'>
        <p>{location.location} {location.locationDetail}</p>
        <p className='mx-4'>{price.toLocaleString('ko-KR')} 원</p>
      </div>
      <div>
        <div className='mt-4'>
          <Typograph tag='h4'>해시태그 입력 후 엔터</Typograph>
        </div>
        <div className='flex flex-wrap mx-2 my-4'>
          {hashtags && hashtags.map((hashtag, i) => <p key={hashtag + i} className='flex items-center mr-4 text-sky' onDoubleClick={() => removeHashtag(hashtag)}><BiHash />{hashtag}</p>)}
        </div>
        <input placeholder='해시태그' className='border-sky text-sky' onKeyDown={handleHashtags} onChange={handleHashtag} value={hashtag}/>
      </div>
    </>
  )
}

export default ProductWriteInput