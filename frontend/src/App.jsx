import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from './components/layout/RootLayout';
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));
// const About = lazy(() => import('./pages/About.jsx'));
// const Contact = lazy(() => import('./pages/Contact.jsx'));

import PageLoader from './components/UI/PageLoader.jsx';

// import { AuthActions } from './store/authSlice.jsx';

const App = () => {
  const authCtx = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const ProtectedRoute = ({ element }) => {
    if (authCtx.isLoggedIn) {
      return element;
    } else {
      Navigate({ to: '/login' });
      return null;
    }
  };

  const LoggedInRoute = ({ element }) => {
    if (!authCtx.isLoggedIn) {
      return element;
    } else {
      Navigate({ to: '/' });
      return null;
    }
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme='dark'
        className='md:w-auto md:min-w-[320px]'
      />
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route
            path='/'
            exact
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Home />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path='/login'
            element={
              <LoggedInRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Login />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path='/register'
            element={
              <LoggedInRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Register />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path='*'
            element={
              <Suspense fallback={<PageLoader />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
