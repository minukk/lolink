import React, { useCallback, useRef, useState } from 'react'
import Link from 'next/link';
import { userState } from '@/stores/user';
import { AxiosError } from 'axios';
import { sendImagesToServer, useProductMutation } from '../api/product';
import HeadTitle from '@/components/atoms/HeadTitle';
import { convertImages } from '@/utils/convertImages';
import Typograph from '../../components/atoms/Typograph';
import ProductWriteInput from '../../components/organisms/product/ProductWriteInput';
import ProductWriteImageUpload from '../../components/organisms/product/ProductWriteImageUpload';
import ProductWriteTextInput from '../../components/organisms/product/ProductWriteTextInput';

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

  const productInputProps = {
    location: location,
    setLocation: setLocation,
    price: price,
    setPrice: setPrice,
    hashtags: hashtags,
    setHashtags: setHashtags,
    handlePrice: handlePrice,
    hashtag: hashtag,
    setHashtag: setHashtag,
    removeHashtag: removeHashtag,
    handleHashtags: handleHashtags,
    handleHashtag: handleHashtag,
  }

  return (
    <>
      <HeadTitle title="LoLink | 중고 상품 올리기" />
      <div className='my-20 text-center'>
        <Typograph tag='h3'>중고 상품 올리기</Typograph>
        <section className='p-4 my-10 border-2 rounded-lg border-sky'>
          <ProductWriteTextInput content={content} setContent={setContent} setTitle={setTitle} />
          <ProductWriteImageUpload imageFiles={imageFiles} imageRef={imageRef} handleChangeFile={handleChangeFile}/>
          <ProductWriteInput {...productInputProps} />
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
