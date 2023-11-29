import { useParams } from 'react-router-dom';

const SingleMail = () => {
  const params = useParams();

  console.log(params);

  return <section>SingleMail</section>;
};

export default SingleMail;
