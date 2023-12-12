import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import { useRef, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ForgotPasswordReq } from '../services/userServices';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value.trim();

    setIsLoading(true);
    try {
      const { data } = await ForgotPasswordReq(enteredEmail);
      console.log(data);
      if (!data.success) toast.error('Something went wrong!');

      toast.success(data.message);
      emailInputRef.current.value = '';
      navigate('/login');
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message || error.message || 'Request failed!';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full mt-10 md:mt-16 flex flex-col overflow-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='flex flex-1 flex-col items-center justify-center pb-20 gap-10 md:gap-20'>
        <h1 className='flex self-center font-semibold text-3xl '>
          Reset Password
        </h1>
        <form onSubmit={submitFormHandler} className='w-full max-w-sm'>
          <Input
            label={'Email address'}
            input={{
              type: 'email',
              name: 'email',
              id: 'email',
              ref: emailInputRef,
              placeholder: 'johndoe@gmail.com',
              required: true,
            }}
          />

          <button
            disabled={isLoading}
            type='submit'
            className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-accent hover:bg-accent/95 text-white w-full disabled:bg-accent/75'
          >
            {!isLoading ? (
              <span>Send Request</span>
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
            Go back to login
          </Link>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
