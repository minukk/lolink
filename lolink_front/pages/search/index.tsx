import { useRouter } from 'next/router';
import React from 'react'

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  return (
    <div>
      search
      <span>검색어: {query}</span>
    </div>
  )
}

export default SearchPage;