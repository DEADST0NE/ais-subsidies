/* eslint-disable import/prefer-default-export */
export const API_URL = 'http://192.168.35.5:8181/api/';

export const SIDEBAR_PARENT_FIRST_TIME_OPENED = 1;
export const SIDEBAR_PARENT_SECOND_TIME_OPENED = 2;
export const SIDEBAR_PARENT_CLOSED = 0;
export const SIDEBAR_PARENT_ALONE_CLOSED = false;
export const SIDEBAR_CHILD_CLOSED = false;
export const SIDEBAR_CHILD_OPENED = true;
export const SIDEBAR_PARENT_ALONE_OPENED = 4;

export const NAV_ITEMS = [
  {
    label: 'Главная',
    icon: 'home',
    link: '/Home',
  },
  {
    label: 'Справочники',
    icon: 'directory',
    link: '/Directory',
    subclasses: [
      {
        label: 'Адреса',
        icon: '',
        link: '/Directory/',
      },
      {
        label: 'Прожиточный минимум',
        icon: '',
        link: '/Directory/',
      },
      {
        label: 'ССЖКУ',
        icon: '',
        link: '/Directory/',
      },
      {
        label: 'Сотрудники',
        icon: '',
        link: '/Directory/',
      },
      {
        label: 'Лицевые счета',
        icon: '',
        link: '/Directory/',
      },
      {
        label: 'Банки',
        icon: '',
        link: '/Directory/',
      },
    ],
  },
  {
    label: 'Журналы',
    icon: 'journal',
    link: '/Journal',
  },
  {
    label: 'Отчеты',
    icon: 'reports',
    link: '/Reports',
  },
  {
    label: 'Заявки с ЕПГУ',
    icon: 'applications',
    link: '/Applications',
  },
  {
    label: 'Ошибки в ЕГИССО',
    icon: 'error',
    link: '/Errors',
  },
  {
    label: 'Настройки',
    icon: 'settings',
    link: '/Settings',
    subclasses: [
      {
        label: 'Смена периода',
        icon: '',
        link: '/Settings/',
      },
      {
        label: 'Ошибки',
        icon: '',
        link: '/Settings/',
      },
      {
        label: 'Проведения оплаты',
        icon: '',
        link: '/Settings/',
      },
      {
        label: 'Программа для сканирования',
        icon: '',
        link: '/Settings/',
      },
    ],
  },
];
