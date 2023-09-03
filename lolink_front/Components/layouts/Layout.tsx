import Header from '../mole/Header';
import Footer from '../mole/Footer';

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