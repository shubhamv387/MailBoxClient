import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { updateMailApiCall } from '../../services/mailServices';
import toast from 'react-hot-toast';
import { MailActions, getAllMailsThunk } from '../../store/mailSlice';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const StarredEl = (props) => {
  const { pathname } = useLocation();
  const authCtx = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const type = pathname.split('/')[1];
  const [mail, setMail] = useState(props.mail);

  const starredHandler = async () => {
    try {
      const {
        data: { success, message },
      } = await updateMailApiCall(
        mail._id,
        { starred: !mail.starred },
        authCtx.token,
        type
      );

      if (!success) return toast.error(message);

      dispatch(
        MailActions.updateMail({
          _id: mail._id,
          mail: { starred: !mail.starred },
        })
      );

      setMail({ ...mail, starred: !mail.starred });

      if (type === 'starred')
        dispatch(getAllMailsThunk(authCtx.token, 'starred'));

      !mail.starred
        ? toast.success('successfully added!')
        : toast.success('successfully removed!');
    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || 'update failed!';
      toast.error(errMsg);
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={starredHandler}>
        {mail.starred ? (
          <IoMdStar size={25} className='text-yellow-500 cursor-pointer' />
        ) : (
          <IoMdStarOutline size={25} />
        )}
      </button>
    </>
  );
};

export default StarredEl;
