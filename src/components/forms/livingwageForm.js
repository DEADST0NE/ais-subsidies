/* eslint-disable no-sequences */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Col, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';
import DatePicker from '../generic/DatePicker';
import ErrorIndicator from '../generic/ErrorIndicator';

const LivingwageForm = ({ defautValueForm, socialGroupId, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  const { socialgroups, error } = useSelector(({ socialgroups }) => socialgroups);
  const dynamic = {};
  const validatObject = {
    dateStart: Yup.string().required('Обязательное поле'),
  };
  dynamic[socialGroupId] = Yup.string().required('Обязательное поле');
  validatObject.livingwageGrup = Yup.object().shape({ ...dynamic });
  const validationSchema = Yup.object().shape(validatObject);
  return (
    <Formik
      initialValues={defautValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(onSuccess(values, onClosed));
      }}
    >
      {({ handleSubmit }) => {
        if (error) return <ErrorIndicator error={error} />;
        return (
          <form style={{ paddingBottom: '5rem' }} onSubmit={handleSubmit}>
            <Form.Row>
              {socialgroups.map((item) => (
                <Col key={item.id} sm="4">
                  <Form.Group>
                    <CustomField
                      type="text"
                      label={item.name}
                      placeholder={item.name}
                      name={`livingwageGrup.${item.id}`}
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col sm="12">
                <Form.Group>
                  <DatePicker label="Дата начала" name="dateStart" />
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

LivingwageForm.defaultProps = {
  defautValueForm: {
    livingwageGrup: {
      1: '',
      2: '',
      3: '',
    },
    dateStart: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  socialGroupId: '',
};

LivingwageForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(
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
  socialGroupId: PropTypes.string,
};

export default LivingwageForm;
