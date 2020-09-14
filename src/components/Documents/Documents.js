import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'react-bootstrap/Table';

import LoadingIndicator from '../generic/LoadingIndicator';
import ErrorIndicator from '../generic/ErrorIndicator';

import getDocuments from '../../store/documents/actions';

const Documents = () => {
  const dispatch = useDispatch();

  const { documentsData, loading, error } = useSelector(({ documents }) => documents);

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!documentsData.length) {
    return <span className="text-muted">Нет данных</span>;
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th className="th-number">№</th>
          <th>Документ</th>
          <th>Обазательный</th>
          <th>Примечание</th>
        </tr>
      </thead>
      <tbody>
        {documentsData.map(({ id, name, required, commentt }, idx) => (
          <tr key={id}>
            <td>{idx + 1}</td>
            <td>{name}</td>
            <td>{required ? 'Да' : 'Нет'}</td>
            <td>{commentt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Documents;
