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
        icon: 'address',
        link: '/Directory/Address',
      },
      {
        label: 'Прожиточный минимум',
        icon: 'minPipleLive',
        link: '/Directory/MinLivePeople',
      },
      {
        label: 'ССЖКУ',
        icon: 'ssjcu',
        link: '/Directory/SSJKU',
      },
      {
        label: 'Сотрудники',
        icon: 'team',
        link: '/Directory/Team',
      },
      {
        label: 'Лицевые счета',
        icon: 'userPayments',
        link: '/Directory/UserScore',
      },
      {
        label: 'Банки',
        icon: 'bank',
        link: '/Directory/Bank',
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
        icon: 'timePeriud',
        link: '/Settings/ChangeTimePeriud',
      },
      {
        label: 'Ошибки',
        icon: 'error',
        link: '/Settings/Error',
      },
      {
        label: 'Проведения оплаты',
        icon: 'payments',
        link: '/Settings/Payments',
      },
    ],
  },
];
