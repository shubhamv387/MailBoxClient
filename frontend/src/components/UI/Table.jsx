import { GoDotFill } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import StarredEl from './StarredEl';
// import ReactHtmlParser from 'react-html-parser';

const Table = ({ mailData }) => {
  const { pathname } = useLocation();

  return (
    <ul className='flex flex-col gap-0.5 w-full'>
      {mailData.map((mail) => (
        <li
          key={mail._id}
          className='flex flex-col lg:flex-row gap-1 lg:gap-10 px-4 py-2 lg:py-0 xl:max-h-[42px] items-start lg:items-center justify-between bg-border/10 text-text hover:bg-blue-500/20'
        >
          <div className='flex gap-2 lg:gap-4 items-center w-full lg:w-auto'>
            <input type='checkbox' className='w-4 h-4 cursor-pointer' />

            <StarredEl mail={mail} />
          </div>

          <Link
            to={`${pathname}/${mail._id}`}
            className='flex-1 w-full relative flex flex-col p-2 lg:flex-row gap-1 items-start lg:items-center justify-between lg:pe-[3.8rem]'
          >
            <div className='flex gap-1 items-center'>
              {mail.markasread === undefined ||
                (!mail.markasread && (
                  <p>
                    <GoDotFill size={23} className='mt-1 text-accent' />
                  </p>
                ))}

              <p className='min-w-[4rem] lg:min-w-[12rem]'>
                {pathname === '/sent' ? (
                  <span>
                    To : &nbsp;{mail.to.split('@')[0].substring(0, 15)}
                  </span>
                ) : (
                  mail.from.split('@')[0].substring(0, 15)
                )}
              </p>
            </div>

            {(pathname === '/all' || pathname === '/starred') && (
              <p className='p-2 py-0.5 me-1 rounded-md bg-background text-sm text-text'>
                {mail.type || 'mail'}
              </p>
            )}

            <div className='flex-1 font-bold inline-flex flex-col md:flex-row items-center'>
              <span>{mail.subject ? mail.subject : ''}&nbsp;</span>
              {mail.body ? (
                <span className='text-border/50 hidden md:inline-flex text-sm font-normal items-center justify-start '>
                  -&nbsp;
                  <span
                    dangerouslySetInnerHTML={{
                      __html: mail.body.substring(0, 50),
                    }}
                  ></span>
                  <span>...</span>
                </span>
              ) : (
                ''
              )}
            </div>

            <p className='absolute right-0'>
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
