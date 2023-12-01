import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../UI/sidebar/Sidebar';

const RootLayout = () => {
  const { pathname } = useLocation();

  const authRouts = new Set(['/login', '/register', '/forgot-password']);

  return (
    <div className='flex w-full bg-background text-text min-h-screen overflow-hidden'>
      {!authRouts.has(pathname) && <Sidebar />}

      <div className='w-full flex flex-col justify-between'>
        <div className='flex-1'>
          {!authRouts.has(pathname) && <Header />}
          <main
            className='wrapper bg-background text-text mb-auto my-5'
            style={{ paddingInline: '1rem' }}
          >
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
