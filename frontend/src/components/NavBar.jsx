import { NavLink, useNavigate } from 'react-router-dom';
import { AuthActions } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className='flex-1 m-auto'>
      <ul className='flex items-center justify-center gap-10 text-text text-lg uppercase font-bold'>
        {auth.isLoggedIn && (
          <li className='text-text'>
            <NavLink to={'/'}>Home</NavLink>
          </li>
        )}
        <li className='text-text'>
          <NavLink to={'/about'}>About</NavLink>
        </li>

        <li className='text-text'>
          <NavLink to={'/contact'}>Contact</NavLink>
        </li>

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
        {auth.isLoggedIn && (
          <li className='text-text'>
            <button
              onClick={() => {
                dispatch(AuthActions.logout());
                navigate('/login');
              }}
              className='uppercase hover:text-accent'
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
