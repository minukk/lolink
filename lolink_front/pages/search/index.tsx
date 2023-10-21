import { useRouter } from 'next/router';
import React from 'react'
import { useQuery } from 'react-query';
import { getSearchApi } from '../api/search';
import Loading from '@/components/atoms/Loading';
import PostList from '@/components/molecules/PostList';
import ProductBox from '@/components/molecules/ProductBox';
import Typograph from '../../components/atoms/Typograph';

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;

  const { data, isLoading } = useQuery(['search', query], () => getSearchApi(query as string));

  console.log(data?.data);
  if (isLoading) {
    return <Loading />;
  }

  const { posts, products } = data?.data;

  return (
    <div className='py-20 w-320 2xl:w-160'>
      <Typograph tag='h3'>검색어: {query}</Typograph>
      <div className='my-10'>
        <div className='py-2 border-b-2 border-sky'>
          <Typograph tag='h3'>게시글</Typograph>
        </div>
        {posts.length === 0 ? <span className='text-3xl font-bold text-sky'>검색 결과가 없습니다.</span> : posts?.map((item: any, i: number) => (
          <PostList key={item.title + i} {...item} />
        ))}
      </div>
      <div className='my-10 text-sky'>
        <div className='py-2 border-b-2 border-sky'>
          <Typograph tag='h3'>상품</Typograph>
        </div>
        <div className='flex flex-wrap'>
          {products.length === 0 ? <span className='text-3xl font-bold text-sky'>검색 결과가 없습니다.</span> : products?.map((item: any, i: number) => (
            <ProductBox key={item.title + i} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage;