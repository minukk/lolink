import React, { useState } from 'react'
import { IProduct } from '@/types/product';
import { useRouter } from 'next/router';
import { deleteProductApi, getProductApi, getProductsApi, useLikeMutation, useUnlikeMutation } from '../api/product';
import Loading from '@/components/atoms/Loading';
import DOMPurify from 'dompurify';
import ProductImage from '@/components/molecules/ProductImage';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { getUserInfo } from '../api/user';
import { ILike } from '@/types/like';
import { socketPrivate } from '../api/socket';
import Alert from '@/components/atoms/Alert';
import ProductPageHeader from '../../components/organisms/product/ProductPageHeader';
import ProductPageHashtag from '../../components/organisms/product/ProductPageHashtag';
import ProductPageButton from '../../components/organisms/product/ProductPageButton';
import { GetStaticPropsContext } from 'next';

const ProductPage = () => {
  const router = useRouter();
  const isToken = typeof window !== 'undefined' && !!sessionStorage.getItem('lolink');
  const productId = router.query?.productId as string;
  
  const [isLiked, setIsLiked] = useState(false);
  const [isChatModal, setIsChatModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const likeMutation = useLikeMutation();
  const unlikeMutation = useUnlikeMutation();
  const { data: productData, isLoading: productLoading } = useQuery(['products', productId], () => getProductApi(productId));
  const { data: userData, isLoading: userLoading } = useQuery(['users'], getUserInfo, {
    enabled: !!isToken,
    onSuccess: (data) => {
      const isLike = data.data?.likes?.some((like: ILike) => (like.productId === productId && like.type === 'like'));
      console.log(data);
      console.log(isLike);
      setIsLiked(isLike);
    }
  });

  if (productLoading || userLoading) {
    return <Loading />
  }

  const { id, title, nickname, createdAt, location, location_detail, like, body, userId, price, imageUrls, hashtags, views } = productData;

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
        unlikeMutation.mutate(productData);
      }
      else {
        likeMutation.mutate(productData);
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
    productData: productData,
  }

  let sanitizedHTML = body;

  if (typeof window !== 'undefined') {
    sanitizedHTML = DOMPurify.sanitize(body);
  }

  return (
    <section className='flex flex-col flex-wrap items-center justify-center'>
      <div className='py-8 my-8 w-160 lg:w-full'>
        {imageUrls &&
          <ProductImage images={images} title={title} />
        }
        <ProductPageHeader {...productProps}/>
        {typeof window === 'undefined'
          ? <div dangerouslySetInnerHTML={{ __html: body }} className='my-10'/>
          :<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} className='my-10'/>
        }
        <ProductPageHashtag hashtags={hashtags} />
        <ProductPageButton {...productButtonProps} />
      </div>
      {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </section>
  )
}

export default ProductPage;

export async function getStaticPaths() {
  const products = await getProductsApi(1);
  const paths = products.data.map((product: IProduct) => ({
    params: { productId: product.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const productId = context?.params?.productId as string;
  await queryClient.prefetchQuery(['products', productId], () => getProductApi(productId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

