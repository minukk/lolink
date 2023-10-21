import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { userState } from '@/stores/user';
import { IProduct } from '@/types/product';
import { useRouter } from 'next/router';
import { deleteProductApi, getProductApi, useLikeMutation, useUnlikeMutation } from '../api/product';
import Loading from '@/components/atoms/Loading';
import { displayCreatedAt } from '@/utils/dateForm';
import { BiFlag, BiHeart, BiTimeFive, BiChat, BiHash, BiMoney, BiSolidHeart, BiShow } from 'react-icons/bi';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import ProductImage from '@/components/molecules/ProductImage';
import { useQuery } from 'react-query';
import { getUserInfo } from '../api/user';
import { ILike } from '@/types/like';
import { IHashtag } from '@/types/hashtag';
import ChatModal from '@/components/organisms/ChatModal';
import { socketPrivate } from '../api/socket';
import Alert from '@/components/atoms/Alert';
import Typograph from '../../components/atoms/Typograph';
import ProductPageHeader from '../../components/organisms/product/ProductPageHeader';
import ProductPageHashtag from '../../components/organisms/product/ProductPageHashtag';
import ProductPageButton from '../../components/organisms/product/ProductPageButton';

interface IProductPage {
  initialProductData: IProduct;
}

const ProductPage: React.FC<IProductPage> = () => {
  const router = useRouter();
  const isToken = typeof window !== 'undefined' && !!sessionStorage.getItem('lolink');
  const productId = router.query?.productId?.[0];
  
  if (!productId) {
    return <Loading />
  }

  const [isLiked, setIsLiked] = useState(false);
  const [isChatModal, setIsChatModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const likeMutation = useLikeMutation();
  const unlikeMutation = useUnlikeMutation();
  const { data: productData, isLoading: productLoading } = useQuery(['products', productId], () => getProductApi(productId));
  const { data: userData, isLoading: userLoading } = useQuery(['users'], getUserInfo, {
    enabled: isToken,
    onSuccess: (data) => {
      const isLike = data.data?.likes?.some((like: ILike) => (like.productId === productId && like.type === 'like'));
      setIsLiked(isLike);
    }
  });
  
  if (productLoading || userLoading) {
    return <Loading />
  }

  const { id, title, nickname, createdAt, location, location_detail, like, body, userId, price, imageUrls, hashtags, views } = productData?.data;

  const handleLike = () => {
    try {
      if (!userData) {
        setAlertMessage('로그인 후 이용해주세요!');
        setShowAlert(true);
        return;
      }
      if (userData.data.id === userId) {
        setAlertMessage('본인의 게시글은 좋아요를 누를 수 없습니다!');
        setShowAlert(true);
        return;
      }

      if (isLiked) {
        unlikeMutation.mutate(productData?.data);
      }
      else {
        likeMutation.mutate(productData?.data);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
      alert('이미 좋아요를 눌렀습니다!');
      setAlertMessage('이미 좋아요를 눌렀습니다!');
      setShowAlert(true);
    }
  };

  const handleChat = () => {
    if (!userData) {
      setAlertMessage('로그인 후 이용해주세요!');
      setShowAlert(true);
      return;
    }
    if (userData.data.id === userId) {
      setAlertMessage('본인의 게시글은 대화를 할 수 없습니다!');
      setShowAlert(true);
      return;
    }
    handleSocket();
    setIsChatModal(true);
  }

  const onDeleteProduct = async () => {
    await deleteProductApi(productId);
    router.replace('/products');
  }

  const handleSocket = () => {
    socketPrivate.auth = { userId: userData?.data?.id, nickname: userData?.data?.nickname };
    socketPrivate.connect();

    socketPrivate.emit('reqJoinRoom', {
      title: title,
      fromUserId: userData?.data?.id,
      fromUserNickname: userData?.data?.nickname,
      toUserId: userId,
      toUserNickname: nickname,
      productId: id,
      productPrice: price,
    });

    socketPrivate.on('connect_error', (err) => {
      if(err.message === 'invalid username') {
        console.log(err);
      }
    });
  }

  const isMyPost = userData?.data?.id === userId;

  const images = imageUrls?.split(',');

  const handleModal = () => {
    setIsChatModal(false);
  };

  const productProps = {
    title,
    nickname,
    price,
    createdAt,
    views,
    isLiked,
    like,
    location,
    location_detail,
  }

  const productButtonProps = {
    id,
    isLiked,
    isChatModal,
    handleModal,
    isMyPost,
    onDeleteProduct,
    handleLike,
    handleChat,
    productData: productData?.data,
  }

  return (
    <section className='flex flex-col flex-wrap items-center justify-center'>
      <div className='py-8 my-8 w-160 lg:w-full'>
        {imageUrls &&
          <ProductImage images={images} title={title} />
        }
        <ProductPageHeader {...productProps}/>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} className='my-10'/>
        <ProductPageHashtag hashtags={hashtags} />
        <ProductPageButton {...productButtonProps} />
      </div>
      {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </section>
  )
}

export default ProductPage;

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const queryClient = new QueryClient();
//   try {
//     const productId = context.params?.productId?.[0]; // 라우터 매개 변수에서 productId를 가져옵니다.
    
//     if (!productId) {
//       console.error('productId가 존재하지 않습니다.');
//       return {
//         notFound: true,
//       };
//     }

//     await queryClient.prefetchQuery(['products', productId], () => getProductApi(productId));

//     return {
//       props: {
//         data: dehydrate(queryClient), // 초기 데이터를 props로 전달합니다.
//       }
//     };
//   } catch (error) {
//     console.error('상품 정보를 불러오는데 실패했습니다.', error);
//     return {
//       notFound: true, // 에러가 발생하면 404 페이지를 표시합니다.
//     };
//   }
// }