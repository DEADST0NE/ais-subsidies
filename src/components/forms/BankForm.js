import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Form } from 'react-bootstrap';

import Icon from '../generic/Icon';
import InputField from '../generic/InputField';
import MaskedInputField from '../generic/MaskedInputField';

const BankForm = () => {
  const { errors, handleSubmit, register, control } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
        <InputField
          name="Name"
          col="12"
          type="text"
          error={errors.Name}
          label="Наименование банка"
          placeholder="Наименование банка"
          Ref={register({ required: 'Обязательное поле' })}
        />
        <InputField
          name="Address"
          col="12"
          type="text"
          error={errors.Address}
          label="Адрес"
          placeholder="Адрес"
          Ref={register({ required: 'Обязательное поле' })}
        />
        <InputField
          name="City"
          col="12"
          type="text"
          error={errors.City}
          label="Город расположения банка"
          placeholder="Адрес"
          Ref={register({ required: 'Обязательное поле' })}
        />

        <Controller
          as={MaskedInputField}
          name="Ks"
          col="12"
          placeholder="Корреспондентский счет"
          error={errors.Ks}
          defaultValue=""
          control={control}
          rules={{ required: 'Обязательное поле' }}
          mask={[/\d{20}$/]}
        />
      </Form.Row>
      <button type="submit" className="btn btn-primary btn-ml calculator-submit-btn">
        Расчитать
        <Icon name="calculator" />
      </button>
    </form>
  );
};

export default BankForm;
