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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  nameRus: Yup.string().required('Обязательное поле'),
  rang: Yup.number().required('Обязательное поле'),
});

const RoleForm = ({ defautValueForm, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={defautValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
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
                    placeholder="Наименование роли"
                    label="Наименование роли"
                    name="name"
                    id="name"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    placeholder="Наименование роли на русском"
                    label="Наименование роли на русском"
                    name="nameRus"
                    id="nameRus"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="number"
                    placeholder="Ранг"
                    label="Ранг"
                    name="rang"
                    id="rang"
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

RoleForm.defaultProps = {
  defautValueForm: {
    name: '',
    nameRus: '',
    rang: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
};

RoleForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
};

export default RoleForm;
