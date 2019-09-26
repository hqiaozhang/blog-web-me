import React, {Component} from 'react';

import {Icon, Breadcrumb} from 'antd';

export default class Breadcrumbs extends Component {
  render() {
    return (
      <div className="index-pageHeader">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
          文章
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="title_fs20"> 文章管理 </div>
      </div>
    );
  }
}
