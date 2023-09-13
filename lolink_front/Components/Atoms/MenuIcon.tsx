import { BiMenu } from 'react-icons/bi';
import MenuBar from '../molecules/MenuBar';
import { useState } from 'react';

const MenuIcon = () => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className='mx-4' onClick={() => setIsMenu((prev) => !prev)}>
      <i className='text-white text-3xl md:text-5xl'><BiMenu /></i>
      {isMenu && <MenuBar />}
    </div>
  )
}

export default MenuIcon