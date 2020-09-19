import { SIDEBAR_BURGER_CLICK } from '../actions';

// Для того чтобы сайд бар коректно работал
// нужно устоновить вручную значения по умолчанию для 1 активеной сылки

const INIT_STATE = {
  showParentSidebar: 4,
  showChildrenSidebar: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIDEBAR_BURGER_CLICK:
      return {
        ...state,
        showParentSidebar: action.showParent,
        showChildrenSidebar: action.showChildren,
      };

    default:
      return state;
  }
};
