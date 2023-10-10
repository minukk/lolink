import React from 'react'

const PostPage = () => {
  return (
    <section className='flex flex-col flex-wrap items-center justify-center'>
      <div className='py-8 my-8 w-160 lg:w-4/5'>
        <h3 className='py-8 text-3xl'>제목입니다.</h3>
        <span className='mr-2 text-gray'>닉네임</span>
        <span className='mx-2 text-gray'>시간</span>
        <span className='mx-2 text-gray'>좋아요</span>
        <span className='mx-2 text-gray'>댓글수</span>
        <p className='py-8'>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </p>
        <div className='text-sky'>#hashtag</div>
      </div>
      <div className='pb-8 mb-20 border-2 rounded-lg w-160 lg:w-4/5 border-sky'>
        <h4 className='p-2 text-white bg-sky'>댓글창</h4>
      </div>
    </section>
  )
}

export default PostPage