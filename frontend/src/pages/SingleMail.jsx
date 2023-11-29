import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getSingleMailApiCall,
  updateMailApiCall,
} from '../services/mailServices';
import { useSelector } from 'react-redux';
import { Loader } from '../components/UI/PageLoader';

const SingleMail = () => {
  const { pathname } = useLocation();
  const params = pathname.split('/');
  const authCtx = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const [mail, setMail] = useState({});

  const type = params[1];
  const _id = params[2];

  const fetchSingleMail = async () => {
    setIsLoading(true);
    try {
      const {
        data: { success, mail },
      } = await getSingleMailApiCall(_id, authCtx.token, type);

      setMail(mail);

      if (type === 'inbox' && success && !mail.isRead) {
        const { data } = await updateMailApiCall(
          _id,
          { isRead: true },
          authCtx.token,
          type
        );

        data.success && setMail({ ...mail, isRead: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleMail();

    // const tId = setTimeout(() => fetchSingleMail(), 10);
    // return clearTimeout(tId);
  }, []);

  if (isLoading) return <Loader className={'p-4 border-[6px] border-accent'} />;

  return (
    <section>
      {mail && (
        <div>
          <p>{mail.to} </p>
          <p>{mail.from} </p>
          <p>{mail.body} </p>
          <p>{mail.date} </p>
          <p>{mail.isRead && 'reading done'} </p>
        </div>
      )}
    </section>
  );
};

export default SingleMail;
