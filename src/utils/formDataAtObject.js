/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
const formDataAtObject = (formData) => {
  const object = {};
  for (const array of formData) {
    object[array[0]] = array[1];
  }
  return object;
};

export default formDataAtObject;
