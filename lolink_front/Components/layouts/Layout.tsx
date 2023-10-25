import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { userState } from '../../stores/post';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../pages/api/user';

const Layout = (props: any) => {
  const { state, setState } = userState();
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    tokenRef.current = sessionStorage.getItem('lolink');
  }, []);

  const { data: userData } = useQuery(['user'], () => getUserInfo(), {
    enabled: !!tokenRef,
    onSuccess: (data) => {
      setState(data?.data);
    }
  });

  console.log(state);

  return (
    <div className='flex flex-wrap justify-center'>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;