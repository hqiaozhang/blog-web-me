import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import Root from './router';
// 渲染前处理(引入所有API)
import preLoader from './utils/loader/loader';
import apis from './apis';
//globe css
import './assets/style/index.scss';


// ========================================================
// Mock & Config Setup
// 渲染前设置配置项和mock API，config为子模块配置项
// ========================================================
preLoader.load({
  config: {},
  apis
});

ReactDOM.render(<Root />, document.getElementById('root'));

// ================= 启用热加载=============
// if (module.hot) {
//   module.hot.accept();
// }
