import React from 'react'
import { dehydrate } from 'react-query';
import HydrateOnClient from '../../hydrate/hydrateOnClient';
import Posts from '.';
import { getPostsApi } from '../api/post';
import getQueryClient from '../../hydrate/getQueryClient';

const HydratedPosts = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], () => getPostsApi(1));
  
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateOnClient state={dehydratedState}>
      <Posts />
    </HydrateOnClient>
  )
}

export default HydratedPosts;
