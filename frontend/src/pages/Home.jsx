const Home = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center bg-background mt-20'>
      <div className='flex gap-3 items-center justify-center'>
        <h1 className='text-2xl text-text font-bold px-4 py-2 rounded-md bg-background border-2 border-accent'>
          Home
        </h1>
        <h1 className='text-2xl text-text font-bold px-4 py-2 rounded-md bg-primary border-2 border-accent'>
          About
        </h1>
        <h1 className='text-2xl text-text font-bold px-4 py-2 rounded-md bg-secondary border-2 border-secondary'>
          Shop
        </h1>
        <h1 className='text-2xl text-background font-bold px-4 py-2 rounded-md bg-accent border-2 border-accent'>
          Contact
        </h1>
        <h1 className='text-2xl text-background font-bold px-4 py-2 rounded-md bg-text border-2 border-text'>
          Blog
        </h1>
      </div>
      <div className='flex gap-5'>
        <div className='rounded-lg bg-primary w-[10rem] h-[10rem]'></div>
        <div className='rounded-lg bg-secondary w-[10rem] h-[10rem]'></div>
        <div className='rounded-lg bg-accent w-[10rem] h-[10rem]'></div>
      </div>
    </div>
  );
};

export default Home;
