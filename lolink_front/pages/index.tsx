import { userState } from '@/stores/user';
import Main from '../components/organisms/Main';

export default function Home() {  
  return (
    <>
      <Main />
    </>
  )
}
// SSR (프론트 서버에서 실행)
// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//   const cookie = req ? req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   // 쿠키가 브라우저에 있는경우만 넣어서 실행
//   // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
//   if (req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   await store.dispatch(loadMyInfo());
//   console.log('state', store.getState());
// });

// export function reportWebVitals(metric) {
//   console.log(metric);
// }
