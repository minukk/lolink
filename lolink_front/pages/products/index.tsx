import { useEffect, useMemo, useRef } from 'react'
import HeadTitle from '@/components/atoms/HeadTitle'
import TypoH2 from '@/components/atoms/TypoH2'
import WriteButton from '@/components/atoms/WriteButton'
import ProductBox from '@/components/molecules/ProductBox'
import { useRouter } from 'next/router'
import { useInfiniteQuery, useQuery } from 'react-query'
import { getProductsApi } from '../api/product'
import Loading from '@/components/atoms/Loading'
import { IProduct } from '@/types/product'
import { throttle } from 'lodash'

const Products = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(['products', page], ({ pageParam = page }) => getProductsApi(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= lastPage.data.meta.last_page ? nextPage : false;
    }
  })

  const products = useMemo(() => {
    if (data) {
      return data.pages.flatMap(pageData => pageData.data.data);
    } else {
      return [];
    }
  }, [data]);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!containerRef.current) return;
      
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
        fetchNextPage();
      }
    }, 500);

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <HeadTitle title="LoLink | 중고 거래" />
      <div className='flex justify-center h-screen overflow-y-auto text-center' ref={containerRef}>
        <section className='w-2/3 py-20'>
          {/* <button onClick={handleGetUser}>유저 정보 가져오기</button> */}
          <article>
            <h3 className='text-3xl text-white rounded-lg bg-sky'>인기 물품</h3>
            <ul className='flex flex-wrap p-4 my-4 border-b-2 border-sky'>
              {Array(5).fill().map((item, i) => (
                <ProductBox key={i} {...item}/>
              ))}
            </ul>
          </article>
          <TypoH2 title='중고 거래' />
          <div className='flex justify-end md:my-4'>
            <WriteButton text='상품 등록'/>
          </div>
          <div className='flex flex-wrap my-10'>
            {products.map((item: IProduct, i: number) => (
              <ProductBox key={item.id + i} {...item}/>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Products