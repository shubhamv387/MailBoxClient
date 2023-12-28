import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.jsx'));
const UpdatePassword = lazy(() => import('../pages/UpdatePassword.jsx'));
const ComposeMail = lazy(() => import('../pages/ComposeMail.jsx'));
const Inbox = lazy(() => import('../pages/Inbox.jsx'));
const Sent = lazy(() => import('../pages/Sent.jsx'));
const PageNotFound = lazy(() => import('../pages/PageNotFound.jsx'));
const SingleMail = lazy(() => import('../pages/SingleMail/SingleMail.jsx'));
const Starred = lazy(() => import('../pages/Starred.jsx'));
const All = lazy(() => import('../pages/All.jsx'));

export const loggedInRouteList = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password/:uuid', element: <UpdatePassword /> },
];

export const protectedRouteList = [
  { path: '/', element: <Navigate to='/inbox' replace /> },
  { path: '/compose-mail', element: <ComposeMail /> },
  { path: '/inbox', element: <Inbox /> },
  { path: '/inbox/:id', element: <SingleMail /> },
  { path: '/sent', element: <Sent /> },
  { path: '/sent/:id', element: <SingleMail /> },
  { path: '/starred', element: <Starred /> },
  { path: '/starred/:id', element: <SingleMail /> },
  { path: '/all', element: <All /> },
  { path: '/all/:id', element: <SingleMail /> },
  { path: '*', element: <PageNotFound /> },
];
