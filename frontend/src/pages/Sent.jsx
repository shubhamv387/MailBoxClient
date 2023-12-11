import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/UI/Table';
import { useEffect } from 'react';
import { getAllMailsThunk } from '../store/mailSlice';
import { Loader } from '../components/UI/PageLoader';
import { STATUS } from '../store/helper';

const Sent = () => {
  const { sent, status } = useSelector((state) => state.mail);
  // const [loader, setLoader] = useState(false);
  const isLoading = status === STATUS.LOADING;

  const dispatch = useDispatch();
  const authCtx = useSelector((state) => state.auth);

  useEffect(() => {
    const tId = setTimeout(
      () => dispatch(getAllMailsThunk(authCtx.token, 'sent')),
      0
    );

    return () => clearTimeout(tId);
  }, []);

  // useEffect(() => {
  //   setLoader(true);
  //   const tId = setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);

  //   return () => clearTimeout(tId);
  // }, []);

  // if (loader) return <Loader className={'p-4 border-[6px] border-accent'} />;

  if (status === STATUS.ERROR)
    return <h1 className='text-3xl font-bold'>Oops, Something went wrong!</h1>;

  return (
    <section className=' flex flex-col w-full justify-center items-center pb-8'>
      {isLoading ? (
        <Loader className={'p-4 border-[6px] border-accent'} />
      ) : sent && sent.length > 0 ? (
        <Table mailData={sent} />
      ) : (
        <h1 className='text-3xl md:text-5xl font-bold'>No mail found!</h1>
      )}
    </section>
  );
};

export default Sent;
