import React, { useCallback, useEffect, useRef, useState } from 'react'
import QuillComponent from '../../../components/organisms/QuillComponent';
import TypoH2 from '@/components/atoms/TypoH2';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Loading from '@/components/atoms/Loading';
import { getProductApi, updateProductApi } from '@/pages/api/product';
import LocationInput from '@/components/molecules/LocationInput';
import HeadTitle from '@/components/atoms/HeadTitle';

const UpdateProduct = () => {
  const quillRef = useRef<any>();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState('');
  const [location, setLocation] = useState({
    location: '서울',
    locationDetail: '강남',
  });
  const router = useRouter();

  const productId = router.query?.productId?.[0];

  if (!productId) {
    return <Loading />
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductApi(productId);
        const { title, body, price, location, location_detail: locationDetail } = res.data;
        setTitle(title);
        setContent(body);
        setPrice(price);
        setLocation({ location, locationDetail });
      } catch(error) {
        console.error('상품을 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = Number(e.target.value);
    setPrice(() => inputPrice);
  }

  const onSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const product = {
      title: title,
      body: content,
      price: price,
      location: location.location,
      location_detail: location.locationDetail,
      category: '일반',
      imageUrls: '',
    }
    
    try {
      await updateProductApi(productId, product);
      router.push('/products');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('상품 수정 실패', axiosError.response?.data);
    }
  }, [title, content, location, price]);
  
  return (
    <>
    <HeadTitle title='LoLink | 상품 수정' />
    <div className='my-20 text-center'>
      <TypoH2 title='상품 글 수정' />
      <section className='p-4 my-10 border-2 rounded-lg border-sky'>
        <div className='border rounded-lg border-sky'>
          <input className='w-full p-2 rounded-lg border-sky' value={title} onChange={handleTitle}/>
        </div>
        <div className='mt-10 mb-20'>
          <QuillComponent quillRef={quillRef} setContent={setContent} value={content}/>
        </div>
        <div className=''>
            <h4>지역을 선택해주세요.</h4>
            <LocationInput location={location} setLocation={setLocation}/>
          </div>
            <div className='mb-4 border-2 rounded-lg border-sky'>
              <input className='p-2 outline-none appearance-none' type='number' placeholder='가격을 입력해주세요.' value={price} onChange={handlePrice} pattern='[0-9]+'/>
            </div>
          <div className='flex justify-center text-gray'>
            <p>{location.location} {location.locationDetail}</p>
            <p className='mx-4'>{price.toLocaleString('ko-KR')} 원</p>
        </div>
        <div className='flex justify-between'>
          <Link href={`/products/${productId}`}>
            <button className='w-24 py-4 border-2 rounded-lg text-red border-red hover:text-white hover:bg-red'>뒤로가기</button>
          </Link>
          <button className='w-24 py-4 border-2 rounded-lg text-green border-green hover:text-white hover:bg-green' onClick={onSubmit}>수정하기</button>
        </div>
      </section>
    </div>
    </>
  )
}

export default UpdateProduct;
