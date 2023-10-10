import React from 'react'
import SearchIcon from '../atoms/SearchIcon'

const SearchForm = () => {
  return (
    <div className='flex p-2 border-2 rounded-lg border-sky sm:hidden'>
      <input className='w-64 text-sky lg:w-50' placeholder='search'/>
      <SearchIcon />
    </div>
  )
}

export default SearchForm