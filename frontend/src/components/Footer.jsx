const Footer = () => {
  return (
    <footer className='wrapper bg-border/5 text-text'>
      <div className='flex items-center justify-center container p-4'>
        <p className='text-sm md:text-base text-center mb-0 text-text'>
          {`Expense Tracker App | Copyright © ${new Date(
            Date.now()
          ).getFullYear()} | All Rights Reserved`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
