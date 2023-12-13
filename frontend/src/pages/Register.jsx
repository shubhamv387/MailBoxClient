import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Input from '../components/UI/Input';
import { registerUser } from '../services/userServices';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../store/authSlice';
import usePasswordCheck from '../hooks/usePasswordCheck';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordCheck] = usePasswordCheck();

  const [isLoading, setIsLoading] = useState(false);
  const [isShownPass, setIsShownPass] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPassInputRef = useRef();

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
    const enteredConfirmPass = confirmPassInputRef.current.value.trim();

    if (enteredEmail.length < 1 || enteredPassword.length < 1) {
      return toast.error('All fields required!');
    }

    // eslint-disable-next-line no-unused-vars
    const regexPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\0-9)(?=.*[^A-Za-z0-9]).{8,}$/;

    const { isValid, message } = passwordCheck(enteredPassword);
    if (!isValid) {
      passwordInputRef.current.focus();
      return toast.error(message);
    }

    if (enteredPassword !== enteredConfirmPass) {
      confirmPassInputRef.current.value = '';
      confirmPassInputRef.current.focus();
      return toast.error('password does not matches!');
    }

    setIsLoading(true);

    try {
      const {
        data: { success, message, userDetails, token },
      } = await registerUser({
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPass,
      });

      if (!success) return toast.error(message);

      dispatch(AuthActions.login({ token, userDetails }));

      // dispatch(AuthActions.setIsProfileCompleted(false));

      toast.success('Account created successfully!');
      navigate('/');

      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      confirmPassInputRef.current.value = '';
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        'Registration failed!';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='mt-10 md:mt-16 w-full flex flex-col overflow-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='flex flex-1 flex-col items-center justify-center pb-20 gap-10 md:gap-20'>
        <h1 className='flex self-center font-semibold text-3xl '>Register</h1>
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

          <Input
            label={'Confirm Password'}
            input={{
              type: 'password',
              name: 'confirmPassword',
              id: 'confirmPassword',
              ref: confirmPassInputRef,
              placeholder: '********',
            }}
          />
          <button
            disabled={isLoading}
            type='submit'
            className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-accent hover:bg-accent/95 text-white w-full disabled:bg-accent/70'
          >
            {!isLoading ? (
              <span>Create a new account</span>
            ) : (
              <>
                <div className='h-5 w-5 mr-3 rounded-full animate-spin border-2 border-solid border-yellow-400 border-t-transparent' />
                <span>Processing...</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className='text-sm text-text flex flex-row items-center justify-center gap-3 md:gap-5'>
        <p className='text-center inline-flex sm:text-left mb-0'>
          Already have an account?
        </p>
        <Link
          className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 ring-1 ring-border/40 hover:ring-border duration-150'
          to={'/login'}
        >
          <span>
            Login &nbsp;
            <span aria-hidden='true'>&rarr;</span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Auth;
