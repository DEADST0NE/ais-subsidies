import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import Icon from '../Icon';

import './SelectTable.scss';

const SelectTable = ({ data, values, setValues, multiple }) => {
  const addItem = (item) => setValues((prevValues) => [...prevValues, item]);

  const removeItem = (item) => setValues((prevValues) => prevValues.filter((it) => it !== item));

  const onChange = (newValue) => {
    if (multiple) {
      if (values.some((it) => it === newValue)) {
        removeItem(newValue);
      } else {
        addItem(newValue);
      }
    } else {
      setValues([newValue]);
    }
  };

  return (
    <Table className="select-table" responsive hover>
      <tbody>
        {data.map((it) => {
          const isSelected = values.some((val) => val === it.id);

          return (
            <tr key={it.id} className={isSelected ? 'active' : ''} onClick={() => onChange(it.id)}>
              <td>{it.name}</td>
              <td className="td-check">
                <Icon name="success" />
                <input
                  id={it.id}
                  type="radio"
                  onChange={() => onChange(it.id)}
                  defaultChecked={isSelected}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

SelectTable.defaultProps = {
  multiple: false,
};

SelectTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setValues: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default SelectTable;
