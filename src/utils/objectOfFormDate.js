/* eslint-disable no-sequences */

const objectOfFormDate = (object) => {
  const formData = new FormData();
  const buildFormData = (formData, object, parentKey) => {
    if (
      object &&
      typeof object === 'object' &&
      !(object instanceof Date) &&
      !(object instanceof File)
    ) {
      Object.keys(object).forEach((key) => {
        buildFormData(formData, object[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = object == null ? '' : object;

      formData.append(parentKey, value);
    }
  };
  buildFormData(formData, object);
  return formData;
};

export default objectOfFormDate;
