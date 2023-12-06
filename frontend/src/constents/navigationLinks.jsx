import { LuMails } from 'react-icons/lu';
import { RiInboxFill, RiPencilFill, RiSendPlaneFill } from 'react-icons/ri';
import { TbStars } from 'react-icons/tb';

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
    title: 'Starred',
    icon: TbStars,
    href: '/starred',
  },
  {
    id: 5,
    title: 'All',
    icon: LuMails,
    href: '/all',
  },
];

export default navigationLinks;
