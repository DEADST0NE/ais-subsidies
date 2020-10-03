/* eslint-disable no-sequences */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Col, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import objectOfFormDate from '../../utils/objectOfFormDate';
import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';
import CustomSelect from '../generic/CustomSelect';

const validationSchema = Yup.object().shape({
  parentId: Yup.string().required('Обязательное поле'),
  orgUnitId: Yup.string().required('Обязательное поле'),
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  eMail: Yup.string().email('Некорректная электронная почта'),
  phoneNumber1: Yup.string().required('Обязательное поле'),
});

const OrgstructureForm = ({
  defautValueForm,
  id,
  onClosed,
  onSuccess,
  loading,
  orgstructuresArray,
}) => {
  const dispatch = useDispatch();

  const bosParent = '00000000-0000-0000-0000-000000000000'; // Главная над структура
  const optionsParent = orgstructuresArray // Строим option над структур
    .filter((item) => item.id !== bosParent)
    .map((item) => ({
      value: item.id,
      label: item.name,
    }));
  optionsParent.unshift({
    value: bosParent,
    label: 'Главный отдел',
  });

  return (
    <Formik
      initialValues={
        defautValueForm.id
          ? {
              ...defautValueForm,
              orgUnitId: defautValueForm.orgUnitId && {
                value: defautValueForm.orgUnitId,
                label: defautValueForm.orgUnitName,
              },
              parentId: defautValueForm.parentId && {
                value: defautValueForm.parentId,
                label: optionsParent.find((item) => item.value === defautValueForm.parentId).label,
              },
            }
          : { ...defautValueForm }
      }
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const object = { ...values };
        object.orgUnitId = values.orgUnitId.value;
        object.parentId = values.parentId.value;
        if (id) object.id = id;
        const formDate = objectOfFormDate(object);
        dispatch(onSuccess(formDate, onClosed));
      }}
    >
      {({ handleSubmit }) => {
        return (
          <form style={{ paddingBottom: '5rem' }} onSubmit={handleSubmit}>
            <Form.Row>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Наименование орг структуры"
                    placeholder="Наименование орг структуры"
                    name="name"
                    id="name"
                  />
                </Form.Group>
              </Col>
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
                  <CustomField type="text" label="Адрес" placeholder="Адрес" name="address" />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес электронной почты"
                    placeholder="Адрес электронной почты"
                    name="email"
                    id="email"
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
                    id="phoneNumber1"
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
                    id="phoneNumber2"
                  />
                </Form.Group>
              </Col>
              <Modal.Footer className="w-100 left-0 bottom-0 position-absolute d-flex">
                <Button
                  onClick={() => {
                    onClosed(false);
                  }}
                  className="rounded"
                  variant="secondary"
                  disabled={loading}
                >
                  Отмена
                </Button>

                <SubmitBtn
                  className="rounded"
                  isSubmitting={loading}
                  text={defautValueForm?.name ? 'Изменить' : 'Добавить'}
                />
              </Modal.Footer>
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
  id: '',
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
  id: PropTypes.string,
  orgstructuresArray: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
};

export default OrgstructureForm;
