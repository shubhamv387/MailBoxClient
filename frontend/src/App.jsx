import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import RootLayout from './components/layout/RootLayout';
import Popup from './components/UI/Popup';
import PageLoader from './components/UI/PageLoader.jsx';
import { validateToken } from './services/userServices.jsx';
import { AuthActions } from './store/authSlice.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import LoggedInRoute from './utils/LoggedInRoute.jsx';
import {
  loggedInRouteList,
  protectedRouteList,
} from './constents/routeList.jsx';

const App = () => {
  const dispatch = useDispatch();
  const authCtx = useSelector((state) => state.auth);

  useEffect(() => {
    const tId = setTimeout(
      () =>
        authCtx.token &&
        validateToken(authCtx.token).catch(() => {
          toast.error('Something wrong, Please login again!');
          dispatch(AuthActions.logout());
        }),
      0
    );

    return () => clearTimeout(tId);
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid green',
            background: 'hsl(var(--border-1))',
            color: 'hsl(var(--background-1))',
          },
        }}
      />

      <Popup />

      <Routes>
        <Route path='/' element={<RootLayout />}>
          {loggedInRouteList.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={
                <LoggedInRoute
                  element={
                    <Suspense fallback={<PageLoader />}>
                      {route.element}
                    </Suspense>
                  }
                />
              }
            />
          ))}

          {protectedRouteList.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={
                <ProtectedRoute
                  element={
                    <Suspense fallback={<PageLoader />}>
                      {route.element}
                    </Suspense>
                  }
                />
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
