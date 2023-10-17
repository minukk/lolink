import { useRouter } from 'next/router';
import React from 'react'
import { useQuery } from 'react-query';
import { getSearchApi } from '../api/search';
import Loading from '@/components/atoms/Loading';
import PostList from '@/components/molecules/PostList';
import ProductBox from '@/components/molecules/ProductBox';

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
      <h3 className='text-3xl font-bold text-sky'>검색어: {query}</h3>
      <div className='my-10'>
        <h4 className='py-4 my-4 text-2xl font-bold border-b-2 text-sky'>게시글</h4>
        {posts.length === 0 ? <span className='text-3xl font-bold text-sky'>검색 결과가 없습니다.</span> : posts?.map((item: any, i: number) => (
          <PostList key={item.title + i} {...item} />
        ))}
      </div>
      <div className='my-10 text-sky'>
        <h4 className='py-4 my-4 text-2xl font-bold border-b-2 text-sky'>상품</h4>
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