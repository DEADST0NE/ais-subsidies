import React from 'react';

import { Form, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Icon from '../generic/Icon';
import CustomField from '../generic/CustomField';
import CustomSelect from '../generic/CustomSelect';
import DatePicker from '../generic/DatePicker';

const validationSchema = Yup.object().shape({
  Name1: Yup.string().required('Обязательное поле'),
  Name2: Yup.string().required('Обязательное поле'),
  Name3: Yup.string().required('Обязательное поле'),
  Name4: Yup.string().required('Обязательное поле'),
  Name5: Yup.string().required('Обязательное поле'),
  Name6: Yup.string().required('Обязательное поле'),
  Name7: Yup.string().required('Обязательное поле'),
  Name8: Yup.string().required('Обязательное поле'),
});

const CalculatorForm = () => {
  return (
    <Formik
      initialValues={{
        Name1: '',
        Name2: '',
        Name3: '',
        Name4: '',
        Name5: '',
        Name6: '',
        Name7: '',
        Name8: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
      }}
    >
      {({ handleSubmit }) => {
        return (
          <form className="mt-5" onSubmit={handleSubmit}>
            <Form.Row>
              <Col sm="12">
                <Form.Group>
                  <CustomSelect
                    placeholder="Количество трудоспособных"
                    label="Количество трудоспособных"
                    name="Name1"
                    data={[
                      { value: 'Каспийск', label: 'Каспийск' },
                      { value: 'Каспийск', label: 'Каспийск' },
                      { value: 'Каспийск', label: 'Каспийск' },
                    ]}
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomSelect
                    placeholder="Выберите населенный пункт"
                    label="Населенный пункт"
                    name="Name2"
                    data={[
                      { value: 'Каспийск', label: 'Каспийск' },
                      { value: 'Каспийск', label: 'Каспийск' },
                      { value: 'Каспийск', label: 'Каспийск' },
                    ]}
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomSelect
                    placeholder="Выберите тип дома"
                    label="Тип дома"
                    name="Name3"
                    data={[
                      { value: 'Каспийск', label: 'Каспийск' },
                      { value: 'Каспийск', label: 'Каспийск' },
                      { value: 'Каспийск', label: 'Каспийск' },
                    ]}
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <DatePicker label="Периуд" name="Name4" />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="number"
                    placeholder="Количество трудоспособных"
                    label="Количество трудоспособных"
                    name="Name5"
                    id="Name5"
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <CustomField
                    type="number"
                    placeholder="Количество пенсионеров"
                    label="Количество пенсионеров"
                    name="Name6"
                    id="Name6"
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <CustomField
                    type="number"
                    placeholder="Количество детей"
                    label="Количество детей"
                    name="Name7"
                    id="Name7"
                  />
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <CustomField
                    type="number"
                    placeholder="Доход"
                    label="Доход"
                    name="Name8"
                    id="Name8"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <button type="submit" className="btn btn-primary btn-ml calculator-submit-btn">
              Расчитать
              <Icon name="calculator" />
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default CalculatorForm;
