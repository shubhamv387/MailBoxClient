import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className='wrapper bg-background text-text mb-auto my-5'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
