import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Input from '../components/UI/Input';
import { loginUser } from '../services/userServices';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../store/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isShownPass, setIsShownPass] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const setIsShownPassHandler = () => {
    setIsShownPass(!isShownPass);

    !isShownPass
      ? (passwordInputRef.current.type = 'text')
      : (passwordInputRef.current.type = 'password');
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    if (enteredEmail.length < 1 || enteredPassword.length < 1) {
      return toast.error('All fields required!');
    }

    setIsLoading(true);

    try {
      const {
        data: { success, message, userDetails, token },
      } = await loginUser({
        email: enteredEmail,
        password: enteredPassword,
      });

      // authCtx.login(data.idToken, data.email);

      if (!success) return toast.error(message);

      dispatch(AuthActions.login({ token, userDetails }));

      // if (data.displayName.length > 0)
      //   dispatch(AuthActions.setIsProfileCompleted(true));
      // else dispatch(AuthActions.setIsProfileCompleted(false));

      toast.success('login successful');
      navigate('/');

      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message || error.message || 'Login failed!';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full mt-10 md:mt-16 flex flex-col overflow-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='flex flex-1 flex-col items-center justify-center pb-20 gap-10 md:gap-20'>
        <h1 className='flex self-center font-semibold text-3xl '>Login</h1>
        <form onSubmit={submitFormHandler} className='w-full max-w-sm'>
          <Input
            label={'Email address'}
            input={{
              type: 'email',
              name: 'email',
              id: 'email',
              ref: emailInputRef,
              placeholder: 'johndoe@gmail.com',
            }}
          />

          <Input
            label={'Password'}
            input={{
              type: 'password',
              name: 'password',
              id: 'password',
              ref: passwordInputRef,
              placeholder: '********',
            }}
            isShownPass={isShownPass}
            setIsShownPass={setIsShownPassHandler}
          />

          <button
            disabled={isLoading}
            type='submit'
            className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-accent hover:bg-accent/95 text-white w-full disabled:bg-accent/75'
          >
            {!isLoading ? (
              <span>Log in to account</span>
            ) : (
              <>
                <div className='h-5 w-5 mr-3 rounded-full animate-spin border-2 border-solid border-yellow-400 border-t-transparent' />
                <span>Sending Request...</span>
              </>
            )}
          </button>
          <p className='mt-8 text-center'>
            <Link
              to='/forgot-password'
              className='text-sm text-text hover:underline'
            >
              Forgot password?
            </Link>
          </p>
        </form>
      </div>

      <div className='flex flex-col mb-10 -mt-8 gap-3 items-center justify-center'>
        <div className='flex flex-col'>
          <p>
            <span className='font-bold'>Test Email:</span> testuser@test.com
          </p>
          <p>
            <span className='font-bold'>Password:</span> Test##123
          </p>
        </div>
      </div>

      <div className='text-sm text-text flex flex-row items-center justify-center gap-3 md:gap-5'>
        <p className='text-center inline-flex sm:text-left mb-0'>
          Don&apos;t have an account?
        </p>
        <Link
          className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 ring-1 ring-border/40 hover:ring-border duration-150'
          to={'/register'}
        >
          <span>
            Register &nbsp;
            <span aria-hidden='true'>&rarr;</span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Login;
