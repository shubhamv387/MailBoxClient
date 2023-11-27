import NavBar from './NavBar';
import ToggleThemeBtn from './ToggleThemeBtn';

const Header = () => {
  return (
    <header className='wrapper py-2 bg-background border-b border-b-border/10 text-text relative'>
      <div className='w-full flex justify-between items-center mx-auto container '>
        <h1 className='uppercase text-text font-bold px-4 py-2 rounded-md bg-background border-2 border-accent'>
          Mail Box Client.
        </h1>
        <NavBar />
        <ToggleThemeBtn />
      </div>
    </header>
  );
};

export default Header;
