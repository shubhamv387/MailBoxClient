import { NavLink, useNavigate } from 'react-router-dom';
import { AuthActions } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { MailActions } from '../store/mailSlice';

const NavBar = ({ className }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    dispatch(MailActions.resetMailState());
    toast.success('logout successful');
    navigate('/login');
  };

  return (
    <nav className={`flex-1 m-auto ${className ? className : ''}`}>
      <ul className='flex flex-col gap-3 lg:flex-row items-center justify-center lg:gap-10 text-text text-lg uppercase font-bold'>
        {auth.isLoggedIn && (
          <>
            {/* <li className='text-text'>
              <NavLink to={'/'}>Home</NavLink>
            </li> */}

            <li className='text-text'>
              <NavLink to={'/compose-mail'}>Compose Mail</NavLink>
            </li>

            <li className='text-text'>
              <NavLink to={'/inbox'}>Inbox</NavLink>
            </li>

            <li className='text-text'>
              <NavLink to={'/sent'}>Sent</NavLink>
            </li>

            <li className='text-text'>
              <button
                onClick={logoutHandler}
                className='uppercase hover:text-accent'
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!auth.isLoggedIn && (
          <>
            <li className='text-text'>
              <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li className='text-text'>
              <NavLink to={'/register'}>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
