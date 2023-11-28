import { useState } from 'react';
import NavBar from './NavBar';
import ToggleThemeBtn from './ToggleThemeBtn';
import { CgMenuRightAlt, CgCloseO } from 'react-icons/cg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='wrapper py-4 bg-background border-b border-b-border/10 text-text relative'>
      <div className='w-full flex justify-between items-center mx-auto container '>
        <h1 className='uppercase text-sm md:text-base text-text font-bold p-2 md:px-4 md:py-2 rounded-md bg-background border-2 border-accent'>
          Mail Box Client.
        </h1>
        <NavBar className={'hidden lg:block'} />
        {isMobileMenuOpen && (
          <NavBar
            className={
              'fixed flex items-center justify-center right-0 top-[4.3rem] w-screen z-20 bg-secondary p-10'
            }
          />
        )}
        <ToggleThemeBtn className={'ms-auto me-3'} />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type='button'
        >
          {isMobileMenuOpen ? (
            <CgCloseO size={29} className='lg:hidden' />
          ) : (
            <CgMenuRightAlt size={29} className='lg:hidden' />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
