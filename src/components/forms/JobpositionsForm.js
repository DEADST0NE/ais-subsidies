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
});

const JobpositionsForm = ({ defautValueForm, onClosed, onSuccess, loading }) => {
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
                    placeholder="Наименнование должности"
                    label="Наименнование должности"
                    name="name"
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

JobpositionsForm.defaultProps = {
  defautValueForm: {
    name: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
};

JobpositionsForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
};

export default JobpositionsForm;
