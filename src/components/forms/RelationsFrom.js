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
import CustomSelect from '../generic/CustomSelect';
import CustomSelectArray from '../generic/CustomSelectArray';

const validationSchema = Yup.object().shape({
  relation: Yup.object().shape({
    name: Yup.string().required('Обязательное поле'),
    isNear: Yup.string().required('Обязательное поле'),
  }),
});

const RelationsFrom = ({ defautValueForm, onClosed, onSuccess, loading, relationsArray }) => {
  const dispatch = useDispatch();
  // Устанавливаем значение по умолчанию
  const initialValues = { ...defautValueForm };
  initialValues.relation.isNear = initialValues.relation.name && {
    value: initialValues.relation.isNear,
    label: initialValues.relation.isNear ? 'Да' : 'Нет',
  };
  initialValues.relationIdDependences = initialValues?.relationDependences?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate({
          relation: {
            id: values.relation.id,
            name: values.relation.name,
            isNear: values.relation.isNear.value,
          },
          relationIdDependences: values.relationIdDependences
            ? values?.relationIdDependences?.map((item) => item.value)
            : [],
          name: values.relation.name,
          isNear: values.relation.isNear.value,
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
                    type="text"
                    label="Наименование отношения"
                    placeholder="Наименование отношения"
                    name="relation.name"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomSelect
                    placeholder="Ближайщий родственик"
                    label="Ближайщий родственик"
                    name="relation.isNear"
                    data={[
                      { value: true, label: 'Да' },
                      { value: false, label: 'Нет' },
                    ]}
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomSelectArray
                    placeholder="Идентификатор зависимого отношения ЧС"
                    label="Идентификатор зависимого отношения ЧС"
                    name="relationIdDependences"
                    data={relationsArray.map((item) => ({
                      value: item.relation.id,
                      label: item.relation.name,
                    }))}
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

RelationsFrom.defaultProps = {
  defautValueForm: {
    relation: {
      name: '',
      isNear: '',
    },
    relationDependences: [],
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  relationsArray: [],
};

RelationsFrom.propTypes = {
  defautValueForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      relation: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        isNear: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({
            value: PropTypes.bool,
            label: PropTypes.string,
          }),
        ]),
      }),
      relationDependences: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          isNear: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
              value: PropTypes.bool,
              label: PropTypes.string,
            }),
          ]),
        })
      ),
    }),
  ]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  relationsArray: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string, PropTypes.bool)),
      ])
    )
  ),
};

export default RelationsFrom;
