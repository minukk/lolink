import getQueryClient from '@/utils/getQueryClient';
import { getProductsApi } from '../api/product';
import { Hydrate, dehydrate } from 'react-query';
import Products from '.';

async function HydrateProducts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['products'], getProductsApi);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Products />
    </Hydrate>
  )  
};

export default HydrateProducts;