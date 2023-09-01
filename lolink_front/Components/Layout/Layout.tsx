import Header from '../Molecules/Header';
import Footer from '../Molecules/Footer';

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