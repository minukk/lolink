import React from 'react'
import QuillComponent from '../QuillComponent'

interface ProductWriteTextInputProps {
  content: string;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
}

const ProductWriteTextInput: React.FC<ProductWriteTextInputProps> = ({ content, setContent, setTitle }) => {
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <>
      <div className='border rounded-lg border-sky'>
        <input className='w-full p-2 rounded-lg border-sky' placeholder='제목을 입력해주세요.' onChange={handleTitle}/>
      </div>
      <div className='mt-10 mb-20'>
        <QuillComponent content={content} setContent={setContent}/>
      </div>
    </>
  )
}

export default ProductWriteTextInput