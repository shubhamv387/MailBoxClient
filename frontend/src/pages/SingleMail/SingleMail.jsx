import { useEffect } from 'react';
import './SingleMail.css';
import { useLocation, useNavigate } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';

import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/UI/PageLoader';
import { MdOutlineArrowBack } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa6';
import StarredEl from '../../components/UI/StarredEl';
import DeleteEl from '../../components/UI/DeleteEl';
import { fetchSingleMailThunk } from '../../store/mailSlice';
import { STATUS } from '../../store/helper';

const SingleMail = () => {
  const { pathname } = useLocation();
  const authCtx = useSelector((state) => state.auth);
  const { singleMail, status } = useSelector((state) => state.mail);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoading = status === STATUS.LOADING;

  const params = pathname.split('/');
  const type = params[1];
  const _id = params[2];

  useEffect(() => {
    const tId = setTimeout(
      () => dispatch(fetchSingleMailThunk(_id, authCtx.token, type)),
      0
    );

    return () => clearTimeout(tId);
  }, []);

  if (isLoading) return <Loader className={'p-4 border-[6px] border-accent'} />;

  return (
    <section className='flex justify-center w-full my-3 px-1 h-[79vh] mx-auto'>
      <div className=' flex flex-col w-full justify-between bg-secondary/30 rounded-lg overflow-hidden '>
        <div className='bg-border/20 text-background p-3 py-2 flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            type='button'
            className='flex items-center hover:text-accent text-text'
          >
            <MdOutlineArrowBack size={20} /> &nbsp;Back
          </button>
        </div>

        <div className='flex w-full gap-2 flex-col md:flex-row justify-between p-4 border-b border-b-border/20'>
          <p className='text-lg md:text-xl font-bold'>{singleMail.subject}</p>
          <div className='flex gap-3 items-center'>
            <StarredEl mail={singleMail} />

            <DeleteEl _id={singleMail._id} />
          </div>
        </div>

        <div className='flex-1 flex flex-col px-2 py-4 md:p-4 w-full overflow-y-auto overflow-x-hidden'>
          <div className='flex  flex-col lg:flex-row gap-3 justify-between pb-4'>
            <div className='flex gap-2 md:gap-3 items-center'>
              <div className='bg-secondary rounded-full border-2 p-2 border-accent'>
                <FaUserTie size={20} />
              </div>

              <div>
                <h3 className='text-base lg:text-lg font-semibold'>
                  {singleMail.from && singleMail.from.split('@')[0]}{' '}
                  <span className='font-normal text-sm lg:text-base text-border/60'>
                    &#60;{singleMail.from}&#62;
                  </span>
                </h3>
                <h4 className='text-sm lg:text-base'>
                  <span className='font-bold text-text/40'>To: &nbsp;</span>
                  {singleMail.to}
                </h4>
              </div>
            </div>

            <p className='w-fit text-sm lg:text-base ms-12'>
              {new Date(singleMail.date).toLocaleString()}
            </p>
          </div>

          <div
            className='p-4 overflow-y-auto h-full html_mail_body'
            dangerouslySetInnerHTML={{ __html: singleMail.body }}
          >
            {/* {ReactHtmlParser(singleMail.body)} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMail;
