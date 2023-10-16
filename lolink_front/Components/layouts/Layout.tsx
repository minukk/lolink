import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/pages/api/user';
import { useEffect, useState } from 'react';
import { userState } from '@/stores/user';

const Layout = (props: any) => {
  const [isToken, setIsToken] = useState<string | null>(null);
  const { setState } = userState();
  const { data, isLoading } = useQuery(['user', isToken], () => getUserInfo(), {
    enabled: !!isToken,
    onSuccess: (data) => {
      setState(data.data);
    }
  });

  useEffect(() => {
    const token = sessionStorage.getItem('lolink');
    setIsToken(token);
  }, []);

  return (
    <div className='flex flex-wrap justify-center'>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;