import { IoMdStarOutline, IoMdStar } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import { updateMailApiCall } from '../../services/mailServices';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MailActions } from '../../store/mailSlice';

const Table = ({ mailData }) => {
  const { pathname } = useLocation();
  const authCtx = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const starredHandler = async (_id, starred) => {
    try {
      const {
        data: { success, message },
      } = await updateMailApiCall(_id, starred, authCtx.token);

      if (!success) return toast(message);

      dispatch(MailActions.updateMail({ _id, mail: { ...starred } }));
    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || 'update failed!';
      alert(errMsg);
      console.log(error);
    }
  };

  return (
    <ul className='flex flex-col gap-0.5 w-full'>
      {mailData.map((mail) => (
        <li
          key={mail._id}
          className='flex flex-col lg:flex-row gap-3 lg:gap-10 p-2 px-4 items-start lg:items-center justify-between bg-border/10 text-text  hover:bg-blue-100/50 hover:text-black'
        >
          <div className='flex gap-2 lg:gap-4 items-center w-full lg:w-auto'>
            <input type='checkbox' className='w-4 h-4 cursor-pointer' />
            {mail.starred ? (
              <button
                onClick={() => starredHandler(mail._id, { starred: false })}
              >
                <IoMdStar
                  size={25}
                  className='text-yellow-900 cursor-pointer'
                />
              </button>
            ) : (
              <button
                onClick={() => starredHandler(mail._id, { starred: true })}
              >
                <IoMdStarOutline size={25} />
              </button>
            )}
          </div>

          <Link
            to={`${pathname}/${mail._id}`}
            className='flex-1 w-full relative flex flex-col lg:flex-row gap-1 items-start lg:items-center justify-between '
          >
            <div className='flex gap-1 items-center'>
              {mail.isRead === undefined ||
                (!mail.isRead && (
                  <p>
                    <GoDotFill size={23} className='mt-1 text-accent' />
                  </p>
                ))}
              <p className='min-w-[4rem] lg:min-w-[12rem]'>
                {pathname === '/outbox' ? (
                  <span>To : &nbsp;{mail.to.split('@')[0]}</span>
                ) : (
                  mail.from.split('@')[0]
                )}
              </p>
            </div>
            {pathname === '/all' && (
              <p className='p-2 py-0.5 rounded-md bg-background text-sm text-text'>
                inbox
              </p>
            )}
            <p className='flex-1 font-bold'>
              {mail.subject ? mail.subject : ''}
              {mail.body ? (
                <span className='text-border/50 font-normal'>
                  &nbsp; - &nbsp; {mail.body.substring(0, 50)}...
                </span>
              ) : (
                ''
              )}
            </p>
            <p className='absolute right-0 text-border/70'>
              {new Date(mail.date).getDate()}&nbsp;
              {new Date(mail.date).toLocaleString('default', {
                month: 'short',
              })}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Table;
