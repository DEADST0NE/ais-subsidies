/* eslint-disable no-sequences */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import objectOfFormDate from '../../utils/objectOfFormDate';
import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  city: Yup.string().required('Обязательное поле'),
  ks: Yup.string()
    .min(20, 'Заполните корреспондентский счет до конца')
    .required('Обязательное поле'),
  bik: Yup.string().min(9, 'Заполните бик до конца').required('Обязательное поле'),
});

const BankForm = ({ defautValueForm, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={defautValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formData = objectOfFormDate(values);
        dispatch(onSuccess(formData, onClosed));
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
                    label="Наименование банка"
                    placeholder="Наименование банка"
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
                    type="number"
                    label="Корреспондентский счет"
                    placeholder="Корреспондентский счет"
                    name="ks"
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomField type="number" label="Бик" placeholder="Бик" name="bik" />
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

BankForm.defaultProps = {
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
};

BankForm.propTypes = {
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
};

export default BankForm;
