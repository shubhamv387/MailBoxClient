import { useEffect, useState } from 'react';
import person_two from '../../../assets/images/person_two.jpg';
import './Sidebar.css';
import { useContext } from 'react';
import { SidebarContext } from '../../../context/sidebarContext.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiInboxFill,
  RiSendPlaneFill,
  RiPencilFill,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { LuMails } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../../store/authSlice.jsx';
import { MailActions } from '../../../store/mailSlice.jsx';
import toast from 'react-hot-toast';

const navigationLinks = [
  {
    id: 1,
    title: 'Compose',
    icon: RiPencilFill,
    href: '/compose-mail',
  },
  {
    id: 2,
    title: 'Inbox',
    icon: RiInboxFill,
    href: '/inbox',
  },

  {
    id: 3,
    title: 'Sent',
    icon: RiSendPlaneFill,
    href: '/outbox',
  },
  {
    id: 4,
    title: 'All',
    icon: LuMails,
    href: '/all',
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarClass, setSidebarClass] = useState('');
  const { isSidebarOpen } = useContext(SidebarContext);

  const { unreadMails } = useSelector((state) => state.mail);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    dispatch(MailActions.resetMailState());
    toast.success('logout successful');
    navigate('/login');
  };

  return (
    <div className={`sidebar bg-secondary flex flex-col ${sidebarClass}`}>
      {/* <div className='user-info'>
        <div className='info-img img-fit-cover'>
          <img src={person_two} alt='profile image' />
        </div>
        <span className='info-name'>alice-doe</span>
      </div> */}

      <nav className='navigation flex-1'>
        <ul className='nav-list'>
          {navigationLinks.map((navigationLink) => (
            <li className='nav-item' key={navigationLink.id}>
              <NavLink
                to={navigationLink.href}
                className={`nav-link xl:w-full`}
              >
                <navigationLink.icon size={20} className='nav-link-icon' />
                <span className='nav-link-text flex-1 flex justify-between items-center'>
                  <span>{navigationLink.title}</span>
                  {navigationLink.title === 'Inbox' && unreadMails ? (
                    <span className='bg-background rounded-full p-0.5 px-2 text-text'>
                      {unreadMails}
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={logoutHandler} className='flex nav-link w-full'>
        <RiLogoutBoxLine size={20} className='nav-link-icon' />{' '}
        <span className='nav-link-text '>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
