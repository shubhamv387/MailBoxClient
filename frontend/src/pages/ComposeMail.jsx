import toast from 'react-hot-toast';

import { CgClose } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiSolidSend } from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from 'react';
import { sendMail } from '../services/mailServices';
import { useDispatch, useSelector } from 'react-redux';
import { MailActions } from '../store/mailSlice';
import { Loader } from '../components/UI/PageLoader';

const ComposeMail = () => {
  const authCtx = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const recipientInputRef = useRef();
  const subjectInputRef = useRef();
  const bodyInputRef = useRef();

  var toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ script: 'sub' }, { script: 'super' }],

    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],

    ['clean'],
  ];

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (recipientInputRef.current.value.trim().length < 1)
      return toast.error('Please provide the Recipient email');

    const formData = {
      to: recipientInputRef.current.value.trim(),
      subject: subjectInputRef.current.value.trim(),
      body: bodyInputRef.current.value.trim(),
    };

    try {
      setIsLoading(true);
      const { data } = await sendMail(formData, authCtx.token);

      if (data.success) dispatch(MailActions.sendMail(data.mail));

      recipientInputRef.current.value = '';
      subjectInputRef.current.value = '';

      toast.success('Message sent successfully!');
      navigate('/sent');
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong!';
      toast.error(errMsg);
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='flex flex-col -mt-1 gap-5 w-full my-3 mx-auto'>
      <h2 className='text-center'>
        Send test mail to:{' '}
        <span className='font-bold text-red-500'>test@test.com</span>
      </h2>
      <div className=' flex flex-col w-full justify-between bg-background rounded-lg border border-border/60'>
        <div className='bg-border/60 text-background p-3 py-2 flex items-center justify-between font-bold'>
          <p className=''>New Message</p>
          <button onClick={() => navigate('/')} type='button'>
            <CgClose size={20} />
          </button>
        </div>

        <form
          onSubmit={formSubmitHandler}
          className='flex flex-1 flex-col justify-between'
        >
          <div className='px-3 flex flex-col h-[65vh]'>
            <input
              ref={recipientInputRef}
              name='recipient'
              type='text'
              placeholder='To'
              className='w-full bg-transparent outline-none border-b border-b-border/20 p-3'
            />
            <input
              ref={subjectInputRef}
              name='subject'
              type='text'
              placeholder='Subject'
              className='w-full bg-transparent border-b border-b-border/20 outline-none p-3'
            />

            <ReactQuill
              ref={bodyInputRef}
              theme='snow'
              value={value}
              onChange={setValue}
              className='h-[80%] w-full bg-transparent flex-1 flex flex-col'
              modules={{ toolbar: toolbarOptions }}
            />
          </div>

          <div className='p-5 py-3 flex items-center justify-between '>
            <button
              disabled={isLoading}
              className='bg-accent hover:bg-accent/80 text-white p-4 py-1 text-lg rounded-full w-fit flex items-center'
              type='submit'
            >
              {isLoading ? (
                <span className='flex items-center'>
                  <Loader className={'p-2 border-2 border-blue'} /> &nbsp;
                  Sending mail...
                </span>
              ) : (
                <span className='flex items-center'>
                  Send &nbsp; <BiSolidSend />
                </span>
              )}
            </button>
            <button type='button' onClick={() => navigate('/')}>
              <RiDeleteBinLine size={23} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ComposeMail;
