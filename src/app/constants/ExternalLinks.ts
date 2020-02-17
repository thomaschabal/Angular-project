import { Phrases } from '../Phrases';

export const LINKS = [
    {
      href: 'https://www.facebook.com/club.ponthe',
      class: 'fa-facebook',
      name: 'Facebook',
    },
    {
      href: 'https://upont.enpc.fr/assos/ponthe',
      class: 'fa-instagram',
      name: 'uPont',
    },
    {
      href: 'https://github.com/ENPC-Ponthe/Angular-project',
      class: 'fa-github',
      name: 'GitHub',
    },
    // {
    //   href: '#',
    //   class: 'fa-linkedin',
    //   name: 'LinkedIn',
    // },
    {
      href: 'mailto:ponthe@liste.enpc.fr',
      class: 'fa-envelope-o',
      name: 'Email',
    },
  ];

export const BUTTON_LINKS_ADMIN = [
    {
        name: Phrases['dashboard.links.slack'],
        address: 'https://ponthe.slack.com/messages',
        class: 'fa-slack',
    },
    {
        name: Phrases['dashboard.links.trello'],
        address: 'https://trello.com/b/WIQhzGmu/ev%C3%A8nements-et-communication',
        class: 'fa-trello',
    },
    {
        name: Phrases['dashboard.links.youtube'],
        address: 'https://www.youtube.com/channel/UCxHf0yHnEezkhuhzuT2yaIg',
        class: 'fa-youtube',
    },
];
