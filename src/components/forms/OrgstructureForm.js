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
  parentId: Yup.string().required('Обязательное поле'),
  orgUnitId: Yup.string().required('Обязательное поле'),
  name: Yup.string().required('Обязательное поле'),
  address: Yup.string().required('Обязательное поле'),
  eMail: Yup.string().required('Обязательное поле'),
  phoneNumber1: Yup.string().required('Обязательное поле'),
});

const OrgstructureForm = ({ defautValueForm, orgstructureId, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={defautValueForm}
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
                    type="text"
                    label="Идентификатор над структуры"
                    placeholder="Идентификатор над структуры"
                    name="parentId"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="number"
                    label="Идентификатор организованной единцы"
                    placeholder="Идентификатор орг единцы"
                    name="orgUnitId"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес организованной единцы структуры"
                    placeholder="Адрес организованной единцы структуры"
                    name="address"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес электронной почты"
                    placeholder="Адрес электронной почты"
                    name="eMail"
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
                  />
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

OrgstructureForm.defaultProps = {
  defautValueForm: {
    parentId: '',
    orgUnitId: '',
    name: '',
    address: '',
    eMail: '',
    phoneNumber1: '',
    phoneNumber2: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  orgstructureId: '',
};

OrgstructureForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  orgstructureId: PropTypes.string,
};

export default OrgstructureForm;
