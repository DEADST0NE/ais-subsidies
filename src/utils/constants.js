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
    link: '/home',
  },
  {
    label: 'Справочники',
    icon: 'directory',
    link: '/directory',
    subclasses: [
      {
        label: 'Адреса',
        icon: 'address',
        link: '/directory/address',
      },
      {
        label: 'Прожиточный минимум',
        icon: 'livingwage',
        link: '/directory/livingwage',
      },
      {
        label: 'ССЖКУ',
        icon: 'ssjcu',
        link: '/directory/SSJKU',
      },
      {
        label: 'Сотрудники',
        icon: 'team',
        link: '/directory/employees',
      },
      {
        label: 'Лицевые счета',
        icon: 'userPayments',
        link: '/directory/userScore',
      },
      {
        label: 'Банки',
        icon: 'bank',
        link: '/directory/bank',
      },
    ],
  },
  {
    label: 'Журналы',
    icon: 'journal',
    link: '/journal',
  },
  {
    label: 'Отчеты',
    icon: 'reports',
    link: '/reports',
  },
  {
    label: 'Заявки с ЕПГУ',
    icon: 'applications',
    link: '/applications',
  },
  {
    label: 'Ошибки в ЕГИССО',
    icon: 'outline-error',
    link: '/errors',
  },
  {
    label: 'Настройки',
    icon: 'settings',
    link: '/settings',
    subclasses: [
      {
        label: 'Смена периода',
        icon: 'timePeriud',
        link: '/settings/changeTimePeriud',
      },
      {
        label: 'Ошибки',
        icon: 'outline-error',
        link: '/settings/error',
      },
      {
        label: 'Проведения оплаты',
        icon: 'payments',
        link: '/settings/payments',
      },
    ],
  },
];
