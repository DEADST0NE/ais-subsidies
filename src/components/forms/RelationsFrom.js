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
import CustomSelect from '../generic/CustomSelect';
import CustomSelectArray from '../generic/CustomSelectArray';

const validationSchema = Yup.object().shape({
  relation: {
    name: Yup.string().required('Обязательное поле'),
    isNear: Yup.number().required('Обязательное поле'),
  },
});

const RelationsFrom = ({
  defautValueForm,
  orgstructureId,
  onClosed,
  onSuccess,
  loading,
  relationsArray,
}) => {
  const dispatch = useDispatch();
  // Устанавливаем значение по умолчанию
  let initialValues;
  if (defautValueForm?.relation) {
    initialValues = {
      relation: {
        name: defautValueForm.relation.name,
        isNear: {
          value: defautValueForm.relation.isNear,
          label: defautValueForm.relation.isNear ? 'Да' : 'Нет',
        },
      },
      relationIdDependences: defautValueForm?.relationDependences?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    };
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
        if (orgstructureId) formDate.append('id', orgstructureId);
        console.log(values);
        // dispatch(onSuccess(formDate, onClosed));
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

RelationsFrom.defaultProps = {
  defautValueForm: {
    relation: {
      name: '',
      isNear: '',
    },
    relationIdDependences: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  orgstructureId: '',
  relationsArray: [],
};

RelationsFrom.propTypes = {
  defautValueForm: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.string, PropTypes.bool),
    PropTypes.arrayOf(
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
