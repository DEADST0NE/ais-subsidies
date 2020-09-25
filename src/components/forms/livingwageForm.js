/* eslint-disable no-sequences */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import objectOfFormDate from '../../utils/objectOfFormDate';
import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';
import DatePicker from '../generic/DatePicker';
import ErrorIndicator from '../generic/ErrorIndicator';

const LivingwageForm = ({ defautValueForm, socialGroupId, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  const { socialgroups, error } = useSelector(({ socialgroups }) => socialgroups);

  const validatObject = {
    dateStart: Yup.string().required('Обязательное поле'),
  };
  validatObject[socialGroupId] = Yup.string().required('Обязательное поле');
  const validationSchema = Yup.object().shape(validatObject);
  return (
    <Formik
      initialValues={defautValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
        console.log(values);
        // dispatch(onSuccess(formDate, onClosed));
      }}
    >
      {({ handleSubmit }) => {
        if (error) return <ErrorIndicator error={error} />;
        return (
          <form style={{ paddingBottom: '4rem' }} onSubmit={handleSubmit}>
            <Form.Row>
              {socialgroups.map((item) => (
                <Col key={item.id} sm="4">
                  <Form.Group>
                    <CustomField
                      type="text"
                      label={item.name}
                      placeholder={item.name}
                      name={`${item.id}`}
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col sm="12">
                <Form.Group>
                  <DatePicker label="Дата начала" name="dateStart" />
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
                />
              </div>
            </Form.Row>
          </form>
        );
      }}
    </Formik>
  );
};

LivingwageForm.defaultProps = {
  defautValueForm: {
    1: '',
    2: '',
    3: '',
    dateStart: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  socialGroupId: '',
};

LivingwageForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  socialGroupId: PropTypes.string,
};

export default LivingwageForm;
