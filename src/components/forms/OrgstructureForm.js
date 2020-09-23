/* eslint-disable no-sequences */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import objectOfFormDate from '../../utils/objectOfFormDate';
import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';
import CustomSelect from '../generic/CustomSelect';

const validationSchema = Yup.object().shape({
  parentId: Yup.string().required('Обязательное поле'),
  orgUnitId: Yup.number().required('Обязательное поле'),
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  eMail: Yup.string().required('Обязательное поле'),
  phoneNumber1: Yup.string().required('Обязательное поле'),
});

const OrgstructureForm = ({
  defautValueForm,
  orgstructureId,
  onClosed,
  onSuccess,
  loading,
  orgstructuresArray,
}) => {
  const dispatch = useDispatch();
  const bosParent = '00000000-0000-0000-0000-000000000000'; // Главная над структура
  const optionsParent = orgstructuresArray // Строим option над структур
    .filter((item) => item.parentId !== bosParent)
    .map((item) => ({
      value: item.parentId,
      label: `Филиал ${item.name}`,
    }));
  optionsParent.unshift({
    value: bosParent,
    label: 'Главный отдел',
  });
  const defautVForm = defautValueForm;
  const searchParentOgr = (array, id) => {
    // Функция определяет значение по умолчаню полю "Над структура"
    const idArray = array.findIndex((item) => item.id === id);
    if (idArray !== -1) {
      const { parentId } = array[idArray];
      if (parentId === bosParent) return { value: bosParent, label: 'Главный отдел' };
      const idx = array.findIndex((item) => item.id === parentId);
      if (idx !== -1) return { value: array[idx].id, label: `Филиал ${array[idx].name}` };
    }
    return '';
  };
  if (defautValueForm.orgUnitId) {
    defautVForm.orgUnitId = {
      value: defautValueForm.orgUnitId,
      label: defautValueForm.orgUnitName,
    };
  }
  defautVForm.parentId = searchParentOgr(orgstructuresArray, orgstructureId);
  return (
    <Formik
      initialValues={defautVForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
        if (orgstructureId) formDate.append('id', orgstructureId);
        dispatch(onSuccess(formDate, onClosed));
      }}
    >
      {({ handleSubmit }) => {
        return (
          <form style={{ paddingBottom: '4rem' }} onSubmit={handleSubmit}>
            <Form.Row>
              <Col sm="12">
                <Form.Group>
                  <CustomSelect
                    placeholder="Выберите над структуру"
                    label="Над структура"
                    name="parentId"
                    data={optionsParent}
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomSelect
                    placeholder="Выберите тип орг"
                    label="Тип орг"
                    name="orgUnitId"
                    data={[
                      { value: '1', label: 'Филиал' },
                      { value: '2', label: 'Отдел' },
                    ]}
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес организованной единцы структуры"
                    placeholder="Адрес организованной единцы структуры"
                    name="address"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес электронной почты"
                    placeholder="Адрес электронной почты"
                    name="eMail"
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomField
                    type="text"
                    mask="tel"
                    label="Телефон основной"
                    placeholder="Телефон основной"
                    name="phoneNumber1"
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomField
                    type="text"
                    mask="tel"
                    label="Телефон дополнительный"
                    placeholder="Телефон дополнительный"
                    name="phoneNumber2"
                  />
                </Form.Group>
              </Col>
              <div className="d-flex w-100 position-absolute left-0 bottom-0">
                <Button
                  onClick={() => {
                    onClosed(false);
                  }}
                  className="w-100"
                  variant="secondary"
                  disabled={loading}
                >
                  Отмена
                </Button>

                <SubmitBtn
                  isSubmitting={loading}
                  className="w-100"
                  text={defautValueForm?.name ? 'Изменить' : 'Добавить'}
                  onClick={() => {
                    onSuccess();
                  }}
                />
              </div>
            </Form.Row>
          </form>
        );
      }}
    </Formik>
  );
};

OrgstructureForm.defaultProps = {
  defautValueForm: {
    id: '',
    parentId: '',
    orgUnitId: '',
    orgUnitName: '',
    name: '',
    address: '',
    eMail: '',
    phoneNumber1: '',
    phoneNumber2: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  orgstructureId: '',
  orgstructuresArray: [],
};

OrgstructureForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ])
    ),
  ]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  orgstructureId: PropTypes.string,
  orgstructuresArray: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
};

export default OrgstructureForm;
