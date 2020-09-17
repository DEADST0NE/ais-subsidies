import React from 'react';

import Banks from '../components/references/Banks';

const BanksPage = () => (
  <div className="app-body m-3">
    <div className="pages-block-content">
      <h1 className="page-title">Список банков</h1>
      <Banks />
    </div>
  </div>
);

export default BanksPage;
