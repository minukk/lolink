import React, { useEffect, useState } from 'react'
import { userState } from '@/stores/user';
import { IProduct } from '@/types/product';
import { useRouter } from 'next/router';
import { deleteProductApi, getProductApi } from '../api/product';
import Loading from '@/components/atoms/Loading';
import { displayCreatedAt } from '@/utils/dateForm';
import { BiFlag, BiHeart, BiTimeFive, BiChat, BiHash, BiMoney } from 'react-icons/bi';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { GetServerSidePropsContext } from 'next';
import ProductImage from '@/components/molecules/ProductImage';

interface IProductPage {
  initialProductData: IProduct;
}

const ProductPage: React.FC<IProductPage> = ({ initialProductData }) => {
  const { state } = userState();
  const [product, setProduct] = useState<IProduct>(initialProductData);

  const router = useRouter();

  const productId = router.query?.productId?.[0];

  if (!productId) {
    return <Loading />
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductApi(productId);
        setProduct(res.data);
      } catch(error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const onDeleteProduct = async () => {
    await deleteProductApi(productId);
    router.replace('/products');
  }

  if (!product) {
    return <Loading />
  }

  const { id, title, nickname, updatedAt, location, location_detail, like, body, userId, price, imageUrls } = product;

  const isMyPost = state?.id === userId;

  const images = imageUrls.split(',');

  return (
    <section className='flex flex-col flex-wrap items-center justify-center'>
      <div className='py-8 my-8 w-160 lg:w-4/5'>
        {imageUrls &&
          <ProductImage images={images} title={title} />
        }
        <h3 className='py-6 text-3xl'>{title}</h3>
        <div className='flex items-center'>
          <span className='mr-8 text-xl text-gray'>{nickname}</span>
          <div className='flex items-center text-xl font-bold text-green'>
            <BiMoney />
            <span className='mx-2'>{price.toLocaleString('ko-KR')} 원</span>
          </div>
        </div>
        <div className='flex items-center my-4'>
          <div className='flex items-center text-gray'>
            <BiTimeFive />
            <span className='mx-2'>{displayCreatedAt(updatedAt)}</span>
          </div>
          <div className='flex items-center mx-2 text-red'>
            <BiHeart />
            <span className='mx-2'>{like}</span>
          </div>
          <div className='flex items-center mx-2 text-sky'>
            <BiFlag />
            <span className='mx-2'>{location}</span>
            <span className='mr-2'>{location_detail}</span>
          </div>
          <div className='flex items-center mx-2 text-green'>
            <BiChat />
            <span className=''>채팅</span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} className='my-10'/>
        <div className='flex items-center text-sky'>
          <BiHash />
          <div>hashtag</div>
        </div>
        <div className='flex justify-end mt-4 text-white'>
          {isMyPost &&
            <>
              <button className='px-4 py-2 mr-2 rounded-lg bg-red hover:bg-onred' onClick={onDeleteProduct}>삭제</button>
              <Link href={`/products/update/${id}`}>
                <button className='px-4 py-2 ml-2 rounded-lg bg-green hover:bg-ongreen'>수정</button>
              </Link>
            </>
          }
        </div>
      </div>
    </section>
  )
}

export default ProductPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const productId = context.params?.productId?.[0]; // 라우터 매개 변수에서 postId를 가져옵니다.
    
    if (!productId) {
      console.error('productId가 존재하지 않습니다.');
      return {
        notFound: true,
      };
    }

    const res = await getProductApi(productId);
    console.log(res.data);
    return {
      props: {
        initialPostData: res.data, // 초기 데이터를 props로 전달합니다.
      }
    };
  } catch (error) {
    console.error('상품 정보를 불러오는데 실패했습니다.', error);
    return {
      notFound: true, // 에러가 발생하면 404 페이지를 표시합니다.
    };
  }
}