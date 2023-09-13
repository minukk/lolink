import HeadTitle from '@/Components/atoms/HeadTitle'
import TypoH2 from '@/Components/atoms/TypoH2'
import ProductBox from '@/Components/molecules/ProductBox'

const Products = () => {
  return (
    <>
      <HeadTitle title="LoLink | 중고 거래" />
      <main className='w-full p-36 md:p-24 text-center'>
        <TypoH2 title='중고 거래' />
        <div className='flex flex-wrap justify-center my-10'>
          {Array(20).fill().map((i) => (
            <ProductBox key={i}/>
          ))}
        </div>
      </main>
    </>
  )
}

export default Products