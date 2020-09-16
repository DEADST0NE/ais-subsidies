import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Form } from 'react-bootstrap';

import Icon from '../generic/Icon';
import InputField from '../generic/InputField';
import CustomSelect from '../generic/CustomSelect';
import DatePicker from '../generic/DatePicker';

const CalculatorSubsidyForm = () => {
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
        <Controller
          as={CustomSelect}
          name="Name1"
          col="6"
          label="Район"
          placeholder="Выберите район"
          error={errors.Name1}
          defaultValue=""
          data={[
            { value: 'Каспийск', label: 'Каспийск' },
            { value: 'Каспийск', label: 'Каспийск' },
            { value: 'Каспийск', label: 'Каспийск' },
          ]}
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          as={CustomSelect}
          label="Населенный пункт"
          placeholder="Выберите населенный пункт"
          name="Name2"
          col="6"
          defaultValue=""
          error={errors.Name2}
          data={[
            { value: 'Каспийск', label: 'Каспийск' },
            { value: 'Каспийск', label: 'Каспийск' },
            { value: 'Каспийск', label: 'Каспийск' },
          ]}
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          as={CustomSelect}
          label="Тип дома"
          placeholder="Выберите тип дома"
          name="Name3"
          col="6"
          defaultValue=""
          error={errors.Name3}
          data={[
            { value: 'Каспийск', label: 'Каспийск' },
            { value: 'Каспийск', label: 'Каспийск' },
            { value: 'Каспийск', label: 'Каспийск' },
          ]}
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          name="Name4"
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value, name }) => (
            <DatePicker
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              selected={value}
              label="Период"
              error={errors.Name4}
              col="6"
            />
          )}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          as={InputField}
          name="Name5"
          col="6"
          type="number"
          error={errors.Name5}
          placeholder="Количество трудоспособных"
          defaultValue="1"
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          as={InputField}
          name="Name6"
          col="6"
          type="number"
          error={errors.Name6}
          placeholder="Количество пенсионеров"
          defaultValue="0"
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          as={InputField}
          name="Name7"
          col="6"
          type="number"
          error={errors.Name7}
          placeholder="Количество детей"
          defaultValue="0"
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
        <Controller
          as={InputField}
          name="Name8"
          col="6"
          type="number"
          error={errors.Name8}
          placeholder="Доход"
          defaultValue="0"
          control={control}
          rules={{ required: 'Обязательное поле' }}
        />
      </Form.Row>
      <button type="submit" className="btn btn-primary btn-ml calculator-submit-btn">
        Расчитать
        <Icon name="calculator" />
      </button>
    </form>
  );
};

export default CalculatorSubsidyForm;
