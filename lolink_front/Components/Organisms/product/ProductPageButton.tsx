import Link from 'next/link'
import React from 'react'
import { BiChat, BiHeart, BiSolidHeart } from 'react-icons/bi'
import ChatModal from '../ChatModal'
import { IProduct } from '../../../types/product';

interface ProductPageButtonProps {
  id: string;
  isLiked: boolean;
  isChatModal: boolean;
  handleModal: () => void;
  isMyPost: boolean;
  onDeleteProduct: () => void;
  handleLike: () => void;
  handleChat: () => void;
  productData: IProduct;
}

const ProductPageButton: React.FC<ProductPageButtonProps> = ({ id, isLiked, isChatModal, handleModal, isMyPost, onDeleteProduct, handleLike, handleChat, productData }) => {
  return (
    <>
      <div className='flex justify-center my-10'>
        <button className='flex items-center p-2 mr-8 text-xl text-center border rounded-lg sm:p-1 sm:text-base text-red hover:text-white hover:bg-red' onClick={handleLike}>
          <span>좋아요</span>
          <span className='ml-2'>
            {isLiked ? <BiSolidHeart /> : <BiHeart />}
          </span>
        </button>
        <button className='flex items-center p-2 text-xl text-center border rounded-lg sm:p-1 sm:text-base text-sky hover:text-white hover:bg-sky' onClick={handleChat}>
          <span>대화하기</span>
          <span className='ml-2'>
            <BiChat />
          </span>
        </button>
        {isChatModal && <ChatModal handleModal={handleModal} {...productData} />}
      </div>
      <div className='flex justify-end mt-4 text-white'>
        {isMyPost &&
          <>
            <button className='px-4 py-2 mr-2 rounded-lg bg-red hover:bg-onred' onClick={onDeleteProduct}>삭제</button>
            <Link href={`/products/update/${id}`}>
              <button className='px-4 py-2 ml-2 rounded-lg bg-green hover:bg-ongreen'>수정</button>
            </Link>
          </>
        }
      </div>
    </>
  )
}

export default React.memo(ProductPageButton);
