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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  city: Yup.string().required('Обязательное поле'),
  ks: Yup.number()
    .min(20, 'Заполните корреспондентский счет до конца')
    .required('Обязательное поле'),
  bik: Yup.number().min(9, 'Заполните бик до конца').required('Обязательное поле'),
});

const livingwageForm = ({ defautValueForm, SocialGroupId, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  const { socialgroups, error } = useSelector(({ socialgroups }) => socialgroups);
  return (
    <Formik
      initialValues={defautValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
        if (SocialGroupId) formDate.append('SocialGroupId', SocialGroupId);
        dispatch(onSuccess(formDate, onClosed));
      }}
    >
      {({ handleSubmit }) => {
        if (error) return <ErrorIndicator error={error} />;
        return (
          <form style={{ paddingBottom: '4rem' }} onSubmit={handleSubmit}>
            <Form.Row>
              {socialgroups.map((item) => (
                <Col sm="4">
                  <Form.Group>
                    <CustomField
                      type="text"
                      label={item.name}
                      placeholder={item.name}
                      name={`wageValue${item.id}`}
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col sm="12">
                <Form.Group>
                  <DatePicker label="Дата начала" name="DateStart" />
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

livingwageForm.defaultProps = {
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

livingwageForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  banksId: PropTypes.string,
};

export default livingwageForm;
