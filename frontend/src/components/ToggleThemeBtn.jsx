import { useSelector, useDispatch } from 'react-redux';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { FaDesktop } from 'react-icons/fa6';
import { ThemeActions } from '../store/themeSlice';
import { useEffect } from 'react';

const ToggleThemeBtn = ({ className }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const options = [
    { icon: <BsFillSunFill className='w-4 md:w-auto' />, text: 'light' },
    {
      icon: <BsFillMoonStarsFill className='w-4 md:w-auto' />,
      text: 'dark-blue',
    },
    { icon: <FaDesktop className='w-4 md:w-auto' />, text: 'system' },
  ];

  useEffect(() => {
    theme !== 'system' && dispatch(ThemeActions.toggleTheme(theme));
  }, []);

  return (
    <div
      className={`bg-secondary rounded-full flex overflow-hidden gap-5 p-3 px-4 md:px-5 ${
        className ? className : ''
      }`}
    >
      {options.map((opt) => (
        <button
          key={opt.text}
          onClick={() => dispatch(ThemeActions.toggleTheme(opt.text))}
          className={`text-lg hover:text-accent transition-colors duration-150 font-bold rounded-md border-border/60 ${
            theme === opt.text ? 'text-accent' : 'text-text'
          }`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};

export default ToggleThemeBtn;
