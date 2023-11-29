import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/UI/Table';
import { getMails } from '../services/mailServices';
import { MailActions } from '../store/mailSlice';
import { useEffect, useState } from 'react';
import { Loader } from '../components/UI/PageLoader';

const Inbox = () => {
  const { allMails } = useSelector((state) => state.mail);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const authCtx = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLoading(true);
    const getAllMails = async () => {
      try {
        const {
          data: { success, allMails },
        } = await getMails({ token: authCtx.token, type: 'inbox' });

        if (success) dispatch(MailActions.getAllMails(allMails));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    authCtx.isLoggedIn && getAllMails();
  }, []);

  return (
    <section className='container flex flex-col justify-center items-center'>
      {isLoading ? (
        <Loader className={'p-4 border-[6px] border-accent'} />
      ) : allMails && allMails.length > 0 ? (
        <Table mailData={allMails} />
      ) : (
        <h1 className='text-5xl font-bold'>No mail found!</h1>
      )}
    </section>
  );
};

export default Inbox;
