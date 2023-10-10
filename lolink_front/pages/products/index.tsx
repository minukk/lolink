import HeadTitle from '@/components/atoms/HeadTitle'
import TypoH2 from '@/components/atoms/TypoH2'
import WriteButton from '@/components/atoms/WriteButton'
import ProductBox from '@/components/molecules/ProductBox'

const Products = () => {
  return (
    <>
      <HeadTitle title="LoLink | 중고 거래" />
      <div className='flex justify-center text-center'>
        <section className='w-2/3 py-20'>
          <article>
            <h3 className='text-3xl text-white rounded-lg bg-sky'>인기 물품</h3>
            <ul className='flex flex-wrap justify-between p-4 my-4 border-b-2 border-sky'>
              {Array(5).fill().map((e, i) => (
                <ProductBox key={i} />
              ))}
            </ul>
          </article>
          <TypoH2 title='중고 거래' />
          <div className='flex justify-end md:my-4'>
            <WriteButton text='상품 등록'/>
          </div>
          <div className='flex flex-wrap justify-between my-10'>
            {Array(20).fill().map((e, i) => (
              <ProductBox key={i}/>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Products