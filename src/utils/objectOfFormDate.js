/* eslint-disable no-sequences */
const objectOfFormDate = (object) => {
  return Object.entries(object).reduce((fd, [k, v]) => (fd.append(k, v), fd), new FormData());
};

export default objectOfFormDate;
