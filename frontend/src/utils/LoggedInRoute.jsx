import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoggedInRoute = ({ element }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return !isLoggedIn ? element : <Navigate to='/' replace />;
};

export default LoggedInRoute;
