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
import DatePicker from '../generic/DatePicker';

const validationSchema = Yup.object().shape({
  maxCost: Yup.number().required('Обязательное поле'),
  dateStart: Yup.string().required('Обязательное поле'),
});

const MaxcostsForm = ({ defautValueForm, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  const initialValues = {
    id: defautValueForm.id,
    maxCost: defautValueForm.maxCost,
    dateStart: defautValueForm.dateStart && new Date(defautValueForm.dateStart),
    dateStop: defautValueForm.dateStop && new Date(defautValueForm.dateStop),
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate({
          ...values,
          maxCost: String(values.maxCost).replace('.', ','),
          dateStart: values.dateStart.toISOString(),
          dateStop: values.dateStop && values.dateStop.toISOString(),
        });
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
                    type="number"
                    label="Максимальная доля расходов"
                    placeholder="Максимальная доля расходов"
                    name="maxCost"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <DatePicker label="Дата начала" name="dateStart" />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <DatePicker label="Дата окончания" name="dateStop" />
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

MaxcostsForm.defaultProps = {
  defautValueForm: {
    id: '',
    maxCost: '',
    dateStart: '',
    dateStop: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
};

MaxcostsForm.propTypes = {
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

export default MaxcostsForm;
