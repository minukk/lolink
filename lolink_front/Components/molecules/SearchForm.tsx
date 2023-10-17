import React, { useState } from 'react'
import SearchIcon from '../atoms/SearchIcon'
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

    // const onlyNumberRegex = /^\d+$/;
    // if (onlyNumberRegex.test(keyword)) {
    //   setError('검색어는 숫자만으로 구성될 수 없습니다.');
    //   return;
    // }
    router.push(`/search?query=${keyword}`);
    setKeyword('');
    setError('');
  }

  return (
    <div className='relative w-80'>
      <div className='flex flex-wrap p-2 border-2 rounded-lg border-sky sm:hidden'>
        <input className='w-64 text-sky lg:w-50' placeholder='search' value={keyword} onChange={handleKeyword} onKeyDown={handleEnter}/>
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
    {error && <p className='absolute text-red'>{error}</p>}
    </div>
  )
}

export default SearchForm;
