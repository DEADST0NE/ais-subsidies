import { SIDEBAR_BURGER_CLICK } from '../actions';

import {
  SIDEBAR_PARENT_FIRST_TIME_OPENED,
  SIDEBAR_PARENT_SECOND_TIME_OPENED,
  SIDEBAR_PARENT_CLOSED,
  SIDEBAR_PARENT_ALONE_CLOSED,
  SIDEBAR_CHILD_CLOSED,
  SIDEBAR_CHILD_OPENED,
  SIDEBAR_PARENT_ALONE_OPENED,
} from '../../utils/constants';

const sidebarBurgerClickAction = (showParent, showChildren) => ({
  type: SIDEBAR_BURGER_CLICK,
  showParent,
  showChildren,
});

const sidebarBurgerShow = (showParent, showChildren) => (dispatch) => {
  if (
    (showParent === SIDEBAR_PARENT_FIRST_TIME_OPENED && showChildren === SIDEBAR_CHILD_OPENED) ||
    (showParent === SIDEBAR_PARENT_SECOND_TIME_OPENED && showChildren === SIDEBAR_CHILD_OPENED)
  ) {
    dispatch(sidebarBurgerClickAction(SIDEBAR_PARENT_SECOND_TIME_OPENED, SIDEBAR_CHILD_CLOSED));
  }
  if (showParent === SIDEBAR_PARENT_SECOND_TIME_OPENED && showChildren === SIDEBAR_CHILD_CLOSED) {
    dispatch(sidebarBurgerClickAction(SIDEBAR_PARENT_CLOSED, SIDEBAR_CHILD_CLOSED));
  }
  if (showParent === SIDEBAR_PARENT_CLOSED && showChildren === SIDEBAR_CHILD_CLOSED) {
    dispatch(sidebarBurgerClickAction(SIDEBAR_PARENT_FIRST_TIME_OPENED, SIDEBAR_CHILD_CLOSED));
  }
  if (showParent === SIDEBAR_PARENT_FIRST_TIME_OPENED && showChildren === SIDEBAR_CHILD_CLOSED) {
    dispatch(sidebarBurgerClickAction(SIDEBAR_PARENT_SECOND_TIME_OPENED, SIDEBAR_CHILD_OPENED));
  }
  if (showParent === SIDEBAR_PARENT_ALONE_OPENED && showChildren === SIDEBAR_CHILD_CLOSED) {
    dispatch(sidebarBurgerClickAction(SIDEBAR_PARENT_ALONE_CLOSED, SIDEBAR_CHILD_CLOSED));
  }
  if (showParent === SIDEBAR_PARENT_ALONE_CLOSED && showChildren === SIDEBAR_CHILD_CLOSED) {
    dispatch(sidebarBurgerClickAction(SIDEBAR_PARENT_ALONE_OPENED, SIDEBAR_CHILD_CLOSED));
  }
};

export default sidebarBurgerShow;
