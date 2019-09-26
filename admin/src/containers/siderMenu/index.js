/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 10:48:21
 * @Email: 991034150@qq.com
 * @Description: 左边导航
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 17:58:55
 */

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Icon, Button} from 'antd';
import {getUrlParms} from '@/utils/util';
import {rquestFuncMenu} from '@/actions/users';
import './index.scss';


const {SubMenu} = Menu;

const mapStateToProps = ({common}) => ({
  menuList: common.menuList,
  collapsed: common.collapsed
});
@connect(mapStateToProps)
export default class SiderMenu extends Component {
  state = {
    defKey: getUrlParms('auid') || '1'
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.props.dispatch(rquestFuncMenu());
  }

  /**
   * @description 渲染单个导航菜单
   * @returns
   */
  renderMenuItem(menus) {
    const {match} = this.props;
    const menuItem = menus.map((d, i) => (
      <Menu.Item key={d.id} >
        {/* <Menu.Item key={d.path}> */}
        <NavLink key={i} to={`${match.path}/${d.path}?auid=${d.id}`}>
          <Icon type={d.icon} />
          <span>{d.name}</span>
        </NavLink>
      </Menu.Item>
    ));
    return menuItem;
  }

  render() {
    const {menuList, collapsed} = this.props;
    return (
      <div className="layout_sider" style={{width: collapsed ? 80 : 256}}>
        <Menu
          defaultSelectedKeys={[this.state.defKey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          {this.renderMenuItem(menuList)}
          {/* <Menu.Item key="1">
            <Icon type="home" />
            <span>首页</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="usergroup-add" />
            <span>用户管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="file-markdown" />
            <span>文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>项目</span>
              </span>
            }
          >
            <Menu.Item key="5">项目列表</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>异常页</span>
              </span>
            }
          >
            <Menu.Item key="9">403</Menu.Item>
            <Menu.Item key="10">404</Menu.Item> */}
          {/* </SubMenu> */}
        </Menu>
      </div>
    );
  }
}

