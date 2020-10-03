/* eslint-disable no-sequences */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Col, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { getRoles } from '../../store/role/actions';
import { getJobpositions } from '../../store/jobpositions/actions';
import { getOrgstructures } from '../../store/orgstructure/actions';

import objectOfFormDate from '../../utils/objectOfFormDate';
import SubmitBtn from '../generic/SubmitBtn';
import CustomField from '../generic/CustomField';
import CustomSelect from '../generic/CustomSelect';

const EmployeeForm = ({ defautValueForm, onClosed, onSuccess, loading }) => {
  const dispatch = useDispatch();

  const { jobpositions, loading: loadingJobPositions, error: errorJobPositions } = useSelector(
    ({ jobpositions }) => jobpositions
  );
  const { orgstructures, loading: loadingOrgstructures, error: errorOrgstructures } = useSelector(
    ({ orgstructure }) => orgstructure
  );
  const { roles, loading: loadingRroles, error: errorRoles } = useSelector(({ role }) => role);
  useEffect(() => {
    dispatch(getRoles());
    dispatch(getJobpositions());
    dispatch(getOrgstructures());
  }, [dispatch, loading]);

  let optionsJobpositions = [];
  let optionsOrgstructures = [];
  let optionsRoles = [];

  if (jobpositions) {
    optionsJobpositions = jobpositions.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }

  if (orgstructures) {
    optionsOrgstructures = orgstructures.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }

  if (roles) {
    optionsRoles = roles.map((item) => ({
      value: item.id,
      label: item.nameRus,
    }));
  }

  const validForm = {
    fio: Yup.string().required('Обязательное поле'),
    phoneNumber1: Yup.string().required('Обязательное поле'),
    orgStructureId: Yup.string().required('Обязательное поле'),
    jobPositionId: Yup.string().required('Обязательное поле'),
    roleId: Yup.string().required('Обязательное поле'),
    isActive: Yup.string().required('Обязательное поле'),
    login: Yup.string().required('Обязательное поле'),
    eMail: Yup.string().email('Некорректная адрес электронной почта'),
  };

  if (!defautValueForm.fio) validForm.password = Yup.string().required('Обязательное поле');

  const validationSchema = Yup.object().shape(validForm);

  return (
    <Formik
      initialValues={{
        ...defautValueForm,
        orgStructureId: defautValueForm.orgStructureId && {
          value: defautValueForm.orgStructureId,
          label: defautValueForm.orgStructureName,
        },
        jobPositionId: defautValueForm.jobPositionId && {
          value: defautValueForm.jobPositionId,
          label: defautValueForm.jobPosition,
        },
        roleId: defautValueForm.roleId && {
          value: defautValueForm.roleId,
          label: defautValueForm.roleName,
        },
        isActive: {
          value: defautValueForm.isActive,
          label: defautValueForm.isActive ? 'Активный' : 'Неактивный',
        },
        password: '',
        comment: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const data = { ...values };
        data.jobPositionId = data.jobPositionId.value;
        data.orgStructureId = data.orgStructureId.value;
        data.roleId = data.roleId.value;
        data.isActive = data.isActive.value;
        const formDate = objectOfFormDate(data);
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
                    label="ФИО сотрудника"
                    placeholder="ФИО сотрудника"
                    name="fio"
                    id="fio"
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomSelect
                    placeholder="Должность сотрудника"
                    label="Должность сотрудника"
                    name="jobPositionId"
                    id="jobPositionId"
                    data={optionsJobpositions}
                    isLoading={loadingJobPositions}
                    isDisabled={errorJobPositions}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomSelect
                    placeholder="Статус активности сотрудника"
                    label="Статус активности сотрудника"
                    name="isActive"
                    data={[
                      { value: true, label: 'Активный' },
                      { value: false, label: 'Не активный' },
                    ]}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomSelect
                    placeholder="Организационная структура сотрудника"
                    label="Организационная структура сотрудника"
                    name="orgStructureId"
                    data={optionsOrgstructures}
                    isLoading={loadingOrgstructures}
                    isDisabled={errorOrgstructures}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomSelect
                    placeholder="Роль сотрудника"
                    label="Роль сотрудника"
                    name="roleId"
                    data={optionsRoles}
                    isLoading={loadingRroles}
                    isDisabled={errorRoles}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Логин сотрудника"
                    placeholder="Логин сотрудника"
                    name="login"
                    id="login"
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Пароль"
                    placeholder="Пароль"
                    name="password"
                    id="password"
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Адрес электронной почты"
                    placeholder="Адрес электронной почты"
                    name="email"
                    id="email"
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
                    id="phoneNumber1"
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
                    id="phoneNumber2"
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Комментарий"
                    placeholder="Комментарий"
                    name="comment"
                    id="comment"
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
                  text={defautValueForm?.id ? 'Изменить' : 'Добавить'}
                />
              </Modal.Footer>
            </Form.Row>
          </form>
        );
      }}
    </Formik>
  );
};

EmployeeForm.defaultProps = {
  defautValueForm: {
    orgStructureId: '',
    jobPositionId: '',
    fio: '',
    phoneNumber1: '',
    phoneNumber2: '',
    email: '',
    login: '',
    password: '',
    isActive: '',
    comment: '',
    roleId: '',
  },
  onClosed: () => {},
  onSuccess: () => {},
  loading: false,
  id: '',
};

EmployeeForm.propTypes = {
  defautValueForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      jobPositionId: PropTypes.string,
      jobPosition: PropTypes.string,
      orgStructureName: PropTypes.string,
      orgStructureId: PropTypes.string,
      roleId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({
          value: PropTypes.number,
          label: PropTypes.string,
        }),
      ]),
      roleName: PropTypes.string,
      fio: PropTypes.string,
      phoneNumber1: PropTypes.string,
      phoneNumber2: PropTypes.string,
      email: PropTypes.string,
      isActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      login: PropTypes.string,
      comment: PropTypes.string,
    }),
  ]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  id: PropTypes.string,
};

export default EmployeeForm;
