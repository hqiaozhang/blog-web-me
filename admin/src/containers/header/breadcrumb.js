import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Breadcrumb} from 'antd';

export default class Breadcrumbs extends Component {
  render() {
    return (
      <div className="index-pageHeader">
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/app">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>
            {this.props.activeMenu}
          </Breadcrumb.Item>
        </Breadcrumb>
        {/* <div className="title_fs20"> 文章管理 </div> */}
      </div>
    );
  }
}
