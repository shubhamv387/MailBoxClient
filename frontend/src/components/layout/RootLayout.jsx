import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const RootLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/login' &&
        pathname !== '/register' &&
        pathname !== '/forgot-password' && <Header />}
      <main className='wrapper bg-background text-text mb-auto my-5'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
