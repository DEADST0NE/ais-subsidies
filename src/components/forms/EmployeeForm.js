/* eslint-disable no-sequences */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Col, Button } from 'react-bootstrap';
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

const validationSchema = Yup.object().shape({
  fio: Yup.string().required('Обязательное поле'),
  phoneNumber1: Yup.string().required('Обязательное поле'),
  orgStructureId: Yup.string().required('Обязательное поле'),
  jobPositionId: Yup.string().required('Обязательное поле'),
  roleId: Yup.string().required('Обязательное поле'),
  isActive: Yup.string().required('Обязательное поле'),
  login: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
  eMail: Yup.string().email('Некорректная адрес электронной почта'),
});

const EmployeeForm = ({ defautValueForm, id, onClosed, onSuccess, loading }) => {
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
  }, [dispatch]);

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

  return (
    <Formik
      initialValues={
        defautValueForm
          ? {
              fio: defautValueForm.fio,
              jobPositionId: defautValueForm.jobPositionId
                ? {
                    value: defautValueForm.jobPositionId,
                    label: defautValueForm.jobPosition,
                  }
                : '',
              isActive: {
                value: defautValueForm.isActive,
                label: defautValueForm.isActive ? 'Активный' : 'Неактивный',
              },
              orgStructureId: defautValueForm.orgStructureId
                ? {
                    value: defautValueForm.orgStructureId,
                    label: defautValueForm.orgStructureName,
                  }
                : '',
              roleId: defautValueForm.roleId
                ? { value: defautValueForm.roleId, label: defautValueForm.roleName }
                : '',
              login: defautValueForm.login,
              eMail: defautValueForm.email,
              phoneNumber1: defautValueForm.phoneNumber1,
              phoneNumber2: defautValueForm.phoneNumber2,
              comment: defautValueForm.comment,
            }
          : ''
      }
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        const formDate = objectOfFormDate(values);
        if (id) formDate.append('id', id);
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
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomSelect
                    placeholder="Должность сотрудника"
                    label="Должность сотрудника"
                    name="jobPositionId"
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
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <CustomField type="text" label="Пароль" placeholder="Пароль" name="password" />
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

              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="text"
                    label="Комментарий"
                    placeholder="Комментарий"
                    name="comment"
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
                  isSubmitting={
                    loading ||
                    loadingJobPositions ||
                    loadingOrgstructures ||
                    loadingRroles ||
                    errorJobPositions ||
                    errorOrgstructures ||
                    errorRoles
                  }
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
  defautValueForm: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  onClosed: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  id: PropTypes.string,
};

export default EmployeeForm;
