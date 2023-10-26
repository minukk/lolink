import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Loading from '../../../Components/Atoms/Loading';
import { getProductApi, sendImagesToServer, updateProductApi } from '../../../pages/api/product';
import HeadTitle from '../../../Components/Atoms/HeadTitle';
import { convertImages } from '../../../utils/convertImages';
import Typograph from '../../../Components/Atoms/Typograph';
import ProductWriteInput from '../../../Components/Organisms/product/ProductWriteInput';
import ProductWriteImageUpload from '../../../Components/Organisms/product/ProductWriteImageUpload';
import ProductWriteTextInput from '../../../Components/Organisms/product/ProductWriteTextInput';

const UpdateProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [location, setLocation] = useState({
    location: '서울',
    locationDetail: '강남',
  });
  const router = useRouter();
  const imageRef = useRef(null);

  const productId = router.query?.productId?.[0] as string;
  console.log(productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductApi(productId);
        const { title, body, price, location, location_detail: locationDetail, imageUrls } = res.data;
        const images = imageUrls.split(',');
        setTitle(title);
        setContent(body);
        setPrice(price);
        setLocation({ location, locationDetail });
        setImageFiles(images);
        setHashtags(res.data.hashtags.map((hashtag: { tag: string; }) => hashtag.tag));
      } catch(error) {
        console.error('상품을 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const product = {
      title: title,
      body: content,
      price: price,
      location: location.location || '',
      location_detail: location.locationDetail || '',
      category: '일반',
      imageUrls: '',
      hashtags: hashtags,
    }
    
    try {
      const urls = await sendImagesToServer(imageFiles);
      product.imageUrls = urls.join(',');
      await updateProductApi(productId, product);
      router.push('/products');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('상품 수정 실패', axiosError.response?.data);
    }
  }, [title, content, location, price, hashtags]);

  if (!productId) {
    return <Loading />
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = Number(e.target.value);
    setPrice(() => inputPrice);
  }

  const removeHashtag = (hashtag: string) => {
    setHashtags((prev: string[]) => prev.filter((prevHash) => prevHash !== hashtag));
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    convertImages(Array.from(files))
      .then((images: string[]) => {
        setImageFiles(images);
    });
  };

  const productInputProps = {
    location,
    setLocation,
    price,
    setPrice,
    hashtags,
    setHashtags,
    handlePrice,
    hashtag,
    setHashtag,
    removeHashtag,
  }
  
  return (
    <>
    <HeadTitle title='LoLink | 상품 수정' />
    <div className='my-20 text-center'>
      <Typograph tag='h3'>상품 글 수정</Typograph>
      <section className='p-4 my-10 border-2 rounded-lg border-sky'>
        <ProductWriteTextInput content={content} setContent={setContent} setTitle={setTitle} />
        <ProductWriteImageUpload imageFiles={imageFiles} imageRef={imageRef} handleChangeFile={handleChangeFile}/>
        <ProductWriteInput {...productInputProps} />
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
