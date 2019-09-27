import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Avatar, Menu, Dropdown} from 'antd';
import Breadcrumbs from './breadcrumb';
import './index.scss';

const menu = (
  <Menu>

    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        个人信息
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);
const mapStateToProps = ({common}) => ({
  collapsed: common.collapsed,
  activeMenu: common.activeMenu
});
@connect(mapStateToProps)
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSlide = e => {
    this.props.dispatch({type: 'MENUCOLLAPSED', collapsed: this.props.collapsed});
  }

  render() {
    return (
      <div>
        <div className="layout_header">
          <Icon onClick={this.handleSlide.bind(this)} type="menu-fold" />
          <div className="right">
            <Dropdown overlay={menu}>
              <Avatar icon="user" />
            </Dropdown>

          </div>
        </div>
        {/* 面包屑 */}
        <Breadcrumbs activeMenu={this.props.activeMenu} />

      </div>
    );
  }
}

