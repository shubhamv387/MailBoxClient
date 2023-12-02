import toast from 'react-hot-toast';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteMailApiCall } from '../../services/mailServices';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Loader } from './PageLoader';

const DeleteEl = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authCtx = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const type = pathname.split('/')[1];

  const deleteHandler = async (_id) => {
    setIsLoading(true);
    try {
      const { data } = await deleteMailApiCall(_id, authCtx.token, type);

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete mail!';
      toast.error(errMsg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader className={'p-2 border-2 border-blue-600'} />;

  return (
    <button
      type='button'
      className='hover:text-accent'
      onClick={() => deleteHandler(props._id)}
    >
      <RiDeleteBinLine size={20} />
    </button>
  );
};

export default DeleteEl;
