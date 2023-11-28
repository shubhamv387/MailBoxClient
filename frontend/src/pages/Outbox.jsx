import { useSelector } from 'react-redux';

const Outbox = () => {
  const { allMails } = useSelector((state) => state.mail);
  // console.log(allMails);

  return (
    <section className='container flex flex-row justify-center items-center'>
      {allMails.length > 0 ? (
        <ul className='flex flex-row justify-center items-center gap-10 w-full'>
          {allMails.map((mail) => (
            <li key={mail._id}>
              <div>
                <p>
                  <span className='font-bold text-accent'>to:</span>&nbsp;{' '}
                  {mail.to}
                </p>
                <p>
                  <span className='font-bold text-accent'>from:</span>&nbsp;{' '}
                  {mail.from}
                </p>
                <p>
                  <span className='font-bold text-accent'>subject:</span>&nbsp;{' '}
                  {mail.subject}
                </p>
                <p>
                  <span className='font-bold text-accent'>message:</span>&nbsp;{' '}
                  {mail.message}
                </p>
                <p>
                  <span className='font-bold text-accent'>date:</span>&nbsp;{' '}
                  {new Date(mail.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className='text-5xl font-bold'>No mail found!</h1>
      )}
    </section>
  );
};

export default Outbox;
