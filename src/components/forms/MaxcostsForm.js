/* eslint-disable no-sequences */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

// import convertDate from '../../utils/convertDate';
import objectOfFormDate from '../../utils/objectOfFormDate';
import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';
import DatePicker from '../generic/DatePicker';

const validationSchema = Yup.object().shape({
  maxCost: Yup.string().required('Обязательное поле'),
  dateStart: Yup.string().required('Обязательное поле'),
  dateStop: Yup.string().required('Обязательное поле'),
});

const MaxcostsForm = ({ defautValueForm, orgstructureId, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  console.log(defautValueForm);
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
  orgstructureId: '',
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
  orgstructureId: PropTypes.string,
};

export default MaxcostsForm;
