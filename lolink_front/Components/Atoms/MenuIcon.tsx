import { BiMenu } from 'react-icons/bi';
import MenuBar from '../molecules/MenuBar';
import { useState } from 'react';

const MenuIcon = () => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className='px-4' onClick={() => setIsMenu((prev) => !prev)}>
      <i className='text-5xl text-sky 2xl:text-3xl sm:text-xl'><BiMenu /></i>
      {isMenu && <MenuBar />}
    </div>
  )
}

export default MenuIcon