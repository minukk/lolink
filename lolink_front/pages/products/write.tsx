import React, { useCallback, useRef, useState } from 'react'
import QuillComponent from '../../components/organisms/QuillComponent';
import TypoH2 from '@/components/atoms/TypoH2';
import Link from 'next/link';
import { userState } from '@/stores/user';
import { AxiosError } from 'axios';

import { sendImage, useProductMutation } from '../api/product';
import LocationInput from '@/components/molecules/LocationInput';
import HeadTitle from '@/components/atoms/HeadTitle';
import Image from 'next/image';
import { resizeAndConvertImage } from '@/utils/imageResize';

const write = () => {
  const { state } = userState();
  const quillRef = useRef<any>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState({ location: '서울', locationDetail: '강남' });
  const [imageFiles, setImageFiles] = useState([]);
  const imageRef = useRef();
  const productMutation = useProductMutation();
  
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = Number(e.target.value);
    setPrice(() => inputPrice);
  }

  const sendImagesToServer = async () => {
    const formData = new FormData();
  
    for (let i = 0; i < imageFiles.length; i++) {
      // 이미지 데이터를 Blob 형태로 가져오기
      const response = await fetch(imageFiles[i]);
      const blob = await response.blob();
      // FormData에 Blob 데이터 추가
      formData.append(`images`, blob);
    }
    // 서버에 POST 요청 보내기
    try {
      const res = await sendImage(formData);
      console.log('이미지 전송 성공');
      return res.data.imageUrls;
    } catch (error) {
      console.error('이미지 전송 실패:', error);
    }
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
    }

    try {
      const urls = await sendImagesToServer();
      product.imageUrls = urls.join(',');
      console.log('products', product);
      productMutation.mutate(product);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('상품 등록 실패', axiosError.response?.data);
    }
  }, [title, content, price, location, imageFiles]);

  const handleChangeFile = (e: React.ChangeEvent<any>) => {
    const files = Array.from(e.target.files);

    Promise.all(files.map(file => {
      return new Promise(async (resolve) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const result = reader.result;

          if (typeof result === 'string' && result.startsWith('data:image')) {
            const imgBlob = await fetch(result).then(res => res.blob());
            const resizedAndConvertedToWebPImageBlob = await resizeAndConvertImage(imgBlob);
            const webPImageUrl = URL.createObjectURL(resizedAndConvertedToWebPImageBlob);
            resolve(webPImageUrl);
          } else {
            try {
              const base64String = btoa(new Uint8Array(result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
              const base64Image = `data:${file.type};base64,${base64String}`;
              const imgBlob = await fetch(base64Image).then(res => res.blob());
              const resizedAndConvertedToWebPImageBlob = await resizeAndConvertImage(imgBlob);
              const webPImageUrl = URL.createObjectURL(resizedAndConvertedToWebPImageBlob);
              resolve(webPImageUrl);
            } catch (error) {
              console.error("Base64 변환 및 WebP 변환 중 오류 발생:", error);
            }
          }
        };

        if (/^image\/.+/i.test(file.type)) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      });
    }))
    .then(images => {
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
            <QuillComponent quillRef={quillRef} content={content} setContent={setContent}/>
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
