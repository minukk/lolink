import { useEffect, useMemo, useRef, useState } from 'react'
import HeadTitle from '@/components/Atoms/HeadTitle'
import ProductBox from '@/components/Molecules/ProductBox'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useInfiniteQuery, useQuery } from 'react-query'
import { getProductsApi } from '../api/product'
import Loading from '@/components/Atoms/Loading'
import { IProduct } from '@/types/product'
import { throttle } from 'lodash'
import Typograph from '../../components/Atoms/Typograph'
import Modal from '../../components/Molecules/Modal'
import { userState } from '../../stores/user'
import Button from '../../components/atoms/Button'
import { GetServerSidePropsContext } from 'next'

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { state } = userState();
  
  const { data, isLoading, fetchNextPage, hasNextPage, error } = useInfiniteQuery(['products'], ({ pageParam = 1 }) => getProductsApi(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= lastPage?.meta.last_page ? nextPage : undefined;
    }
  });
  
  const handleWriteButton = () => {
    if (state && router.asPath === '/products') {
      router.push('/products/write');
    }
    else {
      setShowModal(true);
    }
  }
  

  const products = useMemo(() => {
    if (data) {
      return data.pages.flatMap(pageData => pageData.data);
    } else {
      return [];
    }
  }, [data?.pages]);
  
  const containerRef = useRef(null);

  useEffect(() => {
    if (error) {
      return;
    }
    const handleScroll = throttle(() => {
      if (!document.documentElement) {
        return;
      }
      
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
        fetchNextPage();
      }
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <HeadTitle title="LoLink | 중고 거래" />
      <div className='flex justify-center text-center' ref={containerRef}>
        <section className='py-20 w-320 2xl:w-2/3 lg:w-4/5 sm:w-screen'>
          <article>
            <Typograph tag='h3' secondary>인기 물품</Typograph>
            <ul className='flex flex-wrap p-4 my-4 border-b-2 border-sky sm:p-0 lg:justify-center sm:border-0'>
              {Array(5).fill().map((item, i) => (
                <ProductBox key={i} {...item}/>
              ))}
            </ul>
          </article>
          <Typograph tag='h3'>우리 지역 중고거래</Typograph>
          <div className='flex justify-end'>
            <Button onClick={handleWriteButton} disabled={!state} label='상품 등록'>상품 등록</Button>
          </div>
          <ul className='flex flex-wrap my-10 lg:justify-center' aria-label='우리 지역 중고거래 상품 리스트'>
            {products.map((item: IProduct, i: number) => (
              <ProductBox key={item.id + i} {...item}/>
            ))}
          </ul>
        </section>
      </div>
      {showModal && <Modal onclose={() => setShowModal(false)}/>}
    </>
  )
}

export default Products;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['products'], () => getProductsApi(1));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
