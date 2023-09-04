import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;