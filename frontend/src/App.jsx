import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Toaster } from 'react-hot-toast';

import RootLayout from './components/layout/RootLayout';
// const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));
const ComposeMail = lazy(() => import('./pages/ComposeMail.jsx'));
const Inbox = lazy(() => import('./pages/Inbox.jsx'));
const Sent = lazy(() => import('./pages/Sent.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));
const SingleMail = lazy(() => import('./pages/SingleMail/SingleMail.jsx'));
const Starred = lazy(() => import('./pages/Starred.jsx'));
const All = lazy(() => import('./pages/All.jsx'));
import Popup from './components/UI/Popup';

import PageLoader from './components/UI/PageLoader.jsx';

const App = () => {
  const authCtx = useSelector((state) => state.auth);

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
          <Route
            path='/'
            exact
            element={
              <ProtectedRoute element={<Navigate to='/inbox' replace />} />
            }
          />

          <Route
            path='/compose-mail'
            exact
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ComposeMail />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/inbox'
            exact
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Inbox />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/inbox/:id'
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SingleMail />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/sent'
            exact
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Sent />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/sent/:id'
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SingleMail />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/starred'
            exact
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Starred />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/starred/:id'
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SingleMail />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/all'
            exact
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <All />
                  </Suspense>
                }
              />
            }
          />

          <Route
            path='/all/:id'
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SingleMail />
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
            path='/forgot-password'
            element={
              <LoggedInRoute
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ForgotPassword />
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
