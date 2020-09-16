import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Form } from 'react-bootstrap';

import Icon from '../generic/Icon';
import InputField from '../generic/InputField';
import CustomSelect from '../generic/CustomSelect';
import DatePicker from '../generic/DatePicker';

const CalculatorSubsidyForm = () => {
  const { control, errors, handleSubmit, register } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
        <Controller
          as={CustomSelect}
          name="Name1"
          col="12"
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
          col="12"
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
          col="12"
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
          as={DatePicker}
          control={control}
          onChange={([selected]) => selected}
          error={errors.Name4}
          col="12"
          defaultValue=""
          name="Name4"
          placeholderText="Периуд"
          rules={{ required: 'Обязательное поле' }}
        />
        <InputField
          name="Name5"
          col="12"
          type="number"
          error={errors.Name5}
          placeholder="Количество трудоспособных"
          Ref={register({ required: 'Обязательное поле' })}
        />
        <InputField
          name="Name6"
          col="12"
          type="number"
          error={errors.Name6}
          placeholder="Количество пенсионеров"
          Ref={register({ required: 'Обязательное поле' })}
        />
        <InputField
          name="Name7"
          col="12"
          type="number"
          error={errors.Name7}
          placeholder="Количество детей"
          Ref={register({ required: 'Обязательное поле' })}
        />
        <InputField
          name="Name8"
          col="12"
          type="number"
          error={errors.Name8}
          placeholder="Доход"
          Ref={register({ required: 'Обязательное поле' })}
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
