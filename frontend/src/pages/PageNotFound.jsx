import { Helmet } from 'react-helmet';

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Page not found - Mail box client</title>
      </Helmet>
      <section className='flex flex-col gap-3 justify-center items-center w-full h-96'>
        <h3 className='text-5xl md:text-9xl font-bold'>404</h3>
        <h1 className='text-3xl md:text-5xl font-semibold'>Page Not Found!</h1>
      </section>
    </>
  );
};

export default PageNotFound;
