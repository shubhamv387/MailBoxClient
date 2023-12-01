import { useContext } from 'react';
import ToggleThemeBtn from './ToggleThemeBtn';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { SidebarContext } from '../context/sidebarContext';

const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <header className='p-4 bg-background border-b border-b-border/10 text-text relative'>
      <div className='w-full flex justify-between items-center mx-auto  '>
        <button
          type='button'
          className='flex items-center mr-3'
          onClick={() => toggleSidebar()}
        >
          <CgMenuLeftAlt size={35} />
        </button>
        <h1 className='uppercase hidden md:flex text-sm md:text-base text-text font-bold p-2 md:px-4 md:py-2 rounded-md bg-background border-2 border-accent'>
          Mail Box Client.
        </h1>

        <h1 className='uppercase md:hidden text-sm md:text-base text-text font-bold p-2 md:px-4 md:py-2 rounded-md bg-background border-2 border-accent'>
          M B C.
        </h1>
        <ToggleThemeBtn className={'ms-auto '} />
      </div>
    </header>
  );
};

export default Header;
