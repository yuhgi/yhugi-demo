import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './router';
import '@/resources/style/reset.css';
import '@/resources/style/common.less';

ReactDOM.render(<AppRouter />,document.getElementById('react-app'));