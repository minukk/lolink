import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const Layout = (props: any) => {
  return (
    <div className='flex flex-wrap justify-center'>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;