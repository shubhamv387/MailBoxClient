import { RiInboxFill, RiSendPlaneFill } from 'react-icons/ri';

export const navigationLinks = [
  {
    id: 1,
    title: 'Compose',
    icon: RiInboxFill,
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
    icon: RiInboxFill,
    href: '/all',
  },
];
