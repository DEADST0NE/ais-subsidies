import React from 'react';

import Employees from '../components/references/Employees';

const EmployeesPage = () => (
  <div className="app-body m-3">
    <div className="pages-block-content">
      <h1 className="page-title">Сотрудники</h1>
      <Employees />
    </div>
  </div>
);

export default EmployeesPage;
