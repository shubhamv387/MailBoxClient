import { LuMails } from 'react-icons/lu';
import { RiInboxFill, RiPencilFill, RiSendPlaneFill } from 'react-icons/ri';

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
    href: '/sent',
  },
  {
    id: 4,
    title: 'All',
    icon: LuMails,
    href: '/all',
  },
];

export default navigationLinks;
