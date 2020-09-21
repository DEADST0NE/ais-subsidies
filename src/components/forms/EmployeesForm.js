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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  city: Yup.string().required('Обязательное поле'),
  ks: Yup.number()
    .min(20, 'Заполните корреспондентский счет до конца')
    .required('Обязательное поле'),
  bik: Yup.number().min(9, 'Заполните бик до конца').required('Обязательное поле'),
});

const EmployeesForm = ({ defautValueForm, banksId, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={defautValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
        if (banksId) formDate.append('id', banksId);
        dispatch(onSuccess(formDate, onClosed));
      }}
    >
      {({ handleSubmit }) => {
        return (
          <form style={{ paddingBottom: '4rem' }} onSubmit={handleSubmit}>
            <Form.Row>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Количество трудоспособных"
                    placeholder="Количество трудоспособных"
                    name="name"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Город расположения банка"
                    placeholder="Город расположения банка"
                    name="city"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес банка"
                    placeholder="Адрес банка"
                    name="address"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    mask="ks"
                    label="Корреспондентский счет"
                    placeholder="Корреспондентский счет"
                    name="ks"
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomField type="text" mask="bik" label="Бик" placeholder="Бик" name="bik" />
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

EmployeesForm.defaultProps = {
  defautValueForm: {
    name: '',
    address: '',
    city: '',
    ks: '',
    bik: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  banksId: '',
};

EmployeesForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  banksId: PropTypes.string,
};

export default EmployeesForm;
