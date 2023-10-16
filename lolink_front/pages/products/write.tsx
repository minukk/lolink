import React, { useCallback, useRef, useState } from 'react'
import QuillComponent from '../../components/organisms/QuillComponent';
import TypoH2 from '@/components/atoms/TypoH2';
import Link from 'next/link';
import { userState } from '@/stores/user';
import { AxiosError } from 'axios';

import { sendImage, sendImagesToServer, useProductMutation } from '../api/product';
import LocationInput from '@/components/molecules/LocationInput';
import HeadTitle from '@/components/atoms/HeadTitle';
import Image from 'next/image';
import { BiHash } from 'react-icons/bi';
import { convertImages } from '@/utils/convertImages';

const write = () => {
  const { state } = userState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState({ location: '서울', locationDetail: '강남' });
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const imageRef = useRef(null);
  const productMutation = useProductMutation();
  
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = Number(e.target.value);
    setPrice(() => inputPrice);
  }

  const handleHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }

  const handleHashtags = (e: any) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (hashtags.length < 5) {
        setHashtags((prev: string[]) => [...prev, hashtag]);
      }
      setHashtag('');
    }
  }

  const removeHashtag = (hashtag: string) => {
    setHashtags((prev: string[]) => prev.filter((prevHash) => prevHash !== hashtag));
  }

  const onSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const product = {
      email: state?.email,
      title: title,
      body: content,
      price: price,
      location: location.location,
      location_detail: location.locationDetail,
      category: '일반',
      imageUrls: '',
      hashtags: hashtags,
    }

    try {
      if (imageFiles && imageFiles.length > 0) {
        const urls = await sendImagesToServer(imageFiles);
        product.imageUrls = urls.join(',');
      }
      productMutation.mutate(product);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('상품 등록 실패', axiosError.response?.data);
    }
  }, [title, content, price, location, imageFiles, hashtags]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    convertImages(Array.from(files))
      .then((images: string[]) => {
        setImageFiles(images);
    });
  };

  return (
    <>
      <HeadTitle title="LoLink | 중고 상품 올리기" />
      <div className='my-20 text-center'>
        <TypoH2 title='상품 올리기' />
        <section className='p-4 my-10 border-2 rounded-lg border-sky'>
          <div className='border rounded-lg border-sky'>
            <input className='w-full p-2 rounded-lg border-sky' placeholder='제목을 입력해주세요.' onChange={handleTitle}/>
          </div>
          <div className='mt-10 mb-20'>
            <QuillComponent content={content} setContent={setContent}/>
          </div>
          <div className='my-4 '>
            <p className='my-2'>상품 이미지를 업로드 해주세요.</p>
            {imageFiles.length > 0 &&
              <ul className='flex flex-wrap justify-center'>
                {imageFiles.map((src, i) => (
                  <li key={i} className='p-2 m-2 border rounded-lg border-sky'>
                    <Image src={src} alt='미리보기' width={200} height={200}/>
                  </li>
                ))}
              </ul>
            }
            <label htmlFor='file' className='flex justify-center'>
              <div className='w-56 p-2 border rounded-lg boder-sky text-sky hover:text-white hover:bg-sky'>파일 업로드</div>
            </label>
              <input type='file' name='file' id='file' multiple className='hidden' accept='image/*' ref={imageRef} onChange={handleChangeFile}/>
          </div>
          <div className=''>
            <h4>지역을 선택해주세요.</h4>
            <LocationInput location={location} setLocation={setLocation}/>
          </div>
            <div className='mb-4 border-2 rounded-lg border-sky'>
              <input className='p-2 outline-none appearance-none' type='number' placeholder='가격을 입력해주세요.' onChange={handlePrice} pattern='[0-9]+'/>
            </div>
          <div className='flex justify-center text-gray'>
            <p>{location.location} {location.locationDetail}</p>
            <p className='mx-4'>{price.toLocaleString('ko-KR')} 원</p>
          </div>
          <div>
          <div className='flex flex-wrap mx-2 my-4'>
            {hashtags && hashtags.map((hashtag, i) => <p key={hashtag + i} className='flex items-center mr-4 text-sky' onDoubleClick={() => removeHashtag(hashtag)}><BiHash />{hashtag}</p>)}
            </div>
            <input placeholder='해시태그를 입력하고 엔터를 눌러주세요.' className='border-sky text-sky' onKeyDown={handleHashtags} onChange={handleHashtag} value={hashtag}/>
          </div>
          <div className='flex justify-between mb-8'>
            <Link href='/products'>
              <button className='w-24 py-4 border-2 rounded-lg text-red border-red hover:text-white hover:bg-red'>뒤로가기</button>
            </Link>
            <button className='w-24 py-4 border-2 rounded-lg text-green border-green hover:text-white hover:bg-green' onClick={onSubmit}>상품등록</button>
          </div>
        </section>
      </div>
    </>
  )
}

export default write;
