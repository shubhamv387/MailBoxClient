import { useEffect, useRef, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../components/UI/Input';
import toast from 'react-hot-toast';
import {
  GetResetPasswordReq,
  PostResetPasswordReq,
} from '../services/userServices';
import usePasswordCheck from '../hooks/usePasswordCheck';

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [passwordCheck] = usePasswordCheck();

  const passwordInputRef = useRef();
  const confirmPassInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { uuid } = useParams();

  const [isShownPass, setIsShownPass] = useState(false);

  useEffect(() => {
    GetResetPasswordReq(uuid)
      .then(({ data }) => {
        if (!data.success) navigate('/login');
      })
      .catch((err) => navigate('/login', { replace: true }));
  }, []);

  const setIsShownPassHandler = () => {
    setIsShownPass(!isShownPass);

    !isShownPass
      ? (passwordInputRef.current.type = 'text')
      : (passwordInputRef.current.type = 'password');
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const enteredPassword = passwordInputRef.current.value.trim();
    const enteredConfirmPass = confirmPassInputRef.current.value.trim();

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
      //
      const formData = {
        pass: enteredPassword,
        confirmPass: enteredConfirmPass,
      };
      const { data } = await PostResetPasswordReq(uuid, formData);

      if (!data.success) toast.error(data.message);

      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message || error.message || 'Request failed!';
      toast.error(errMsg);
      if (errMsg === 'Link expired, Request a new link!')
        navigate('/forgot-password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full mt-10 md:mt-16 flex flex-col overflow-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='flex flex-1 flex-col items-center justify-center pb-20 gap-10 md:gap-20'>
        <h1 className='flex self-center font-semibold text-2xl '>
          Create New Password
        </h1>
        <form onSubmit={submitFormHandler} className='w-full max-w-sm'>
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
            className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-accent hover:bg-accent/95 text-white w-full disabled:bg-accent/75'
          >
            {!isLoading ? (
              <span>Reset Password</span>
            ) : (
              <>
                <div className='h-5 w-5 mr-3 rounded-full animate-spin border-2 border-solid border-yellow-400 border-t-transparent' />
                <span>Sending Request...</span>
              </>
            )}
          </button>
          <Link
            to='/login'
            className='group w-fit text-base mt-8 flex items-center gap-2 text-text hover:underline'
          >
            <span className='group-hover:-translate-x-2 duration-200'>
              <BsArrowLeft size={20} />
            </span>
            Go to login page
          </Link>
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
