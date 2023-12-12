import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/UI/Table';
import { getAllMailsThunk } from '../store/mailSlice';
import { useEffect } from 'react';
import { Loader } from '../components/UI/PageLoader';
import { STATUS } from '../store/helper';

const Inbox = () => {
  const { status, inbox } = useSelector((state) => state.mail);
  const isLoading = status === STATUS.LOADING;
  const dispatch = useDispatch();
  const authCtx = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(getAllMailsThunk(authCtx.token, 'inbox'));

    const tId = setTimeout(() => {
      // console.log('allMails');
      dispatch(getAllMailsThunk(authCtx.token, 'inbox'));
    }, 0);

    return () => clearTimeout(tId);
    // return () => {};
  }, [authCtx.token]);

  if (status === STATUS.ERROR)
    return <h1 className='text-3xl font-bold'>Oops, Something went wrong!</h1>;

  return (
    <section className=' flex flex-col w-full justify-center items-center pb-8'>
      {status === STATUS.ERROR && (
        <h1 className='text-3xl font-bold'>Oops, Something went wrong!</h1>
      )}

      {isLoading ? (
        <Loader className={'p-4 border-[6px] border-accent'} />
      ) : (
        <>
          {inbox && inbox.length > 0 ? (
            <Table mailData={inbox} />
          ) : (
            <h1 className='text-3xl md:text-5xl font-bold'>No mail found!</h1>
          )}
        </>
      )}
    </section>
  );
};

export default Inbox;
