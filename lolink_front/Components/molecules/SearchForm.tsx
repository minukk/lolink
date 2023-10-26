import React, { useState } from 'react'
import SearchIcon from '../Atoms/SearchIcon'
import { useRouter } from 'next/router';
import { set } from 'lodash';

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }


  const handleSearch = () => {
    if (keyword.length < 2) {
      setError('검색어는 2자 이상이어야 합니다.');
      return;
    }

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharacterRegex.test(keyword)) {
      setError('검색어는 특수 문자를 포함할 수 없습니다.');
      return;
    }

    router.push(`/search?query=${keyword}`);
    setKeyword('');
    setError('');
  }

  return (
    <div className='relative w-80 mobile:absolute mobile:top-96 mobile:w-60'>
      <div className='flex p-2 bg-white border-2 rounded-lg border-sky'>
        <input className='w-full text-sky' placeholder='검색어를 입력하세요.' value={keyword} onChange={handleKeyword} onKeyDown={handleEnter}/>
        <button className='' onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
    {error && <p className='absolute text-red'>{error}</p>}
    </div>
  )
}

export default SearchForm;
