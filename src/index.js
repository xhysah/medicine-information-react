import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter } from "react-router-dom";

import './assets/css/reset.css'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';


import store from './store'
import App from '@/App';


ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <HashRouter>
        <App /> 
      </HashRouter>
    </Provider>
    </ConfigProvider>,
  document.getElementById('root')
);
