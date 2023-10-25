import React from 'react'
import Image from 'next/image'
import Typograph from '../../atoms/Typograph'

interface ProductWriteImageUploadProps {
  imageFiles: string[];
  imageRef: React.RefObject<HTMLInputElement>;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductWriteImageUpload: React.FC<ProductWriteImageUploadProps> = ({ imageFiles, imageRef, handleChangeFile }) => {
  return (
    <div className='my-4 '>
      <div className='my-4'>
        <Typograph tag='h4'>상품 이미지를 업로드 해주세요.</Typograph>
      </div>
      {imageFiles.length > 0 &&
        <ul className='flex flex-wrap justify-center'>
          {imageFiles.map((src, i) => (
            <li key={i} className='p-2 m-2 border rounded-lg border-sky'>
              <Image src={src} alt='상품 이미지 미리보기' width={200} height={200}/>
            </li>
          ))}
        </ul>
      }
      <label htmlFor='file' className='flex justify-center'>
        <div className='w-56 p-2 border rounded-lg boder-sky text-sky hover:text-white hover:bg-sky'>이미지 업로드</div>
      </label>
      <input type='file' name='file' id='file' multiple className='hidden' accept='image/*' ref={imageRef} onChange={handleChangeFile} aria-label='이미지 업로드'/>
    </div>
  )
}

export default ProductWriteImageUpload