import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? element : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
