/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 10:48:21
 * @Email: 991034150@qq.com
 * @Description: 左边导航
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 16:51:20
 */

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Icon, Button} from 'antd';
import {getUrlParms} from '@/utils/util';
import {rquestFuncMenu} from '@/actions/users';
import {isEmpty} from 'lodash';
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

  getActiveMenu(pathname, menus) {
    menus.map(item => {
      const path = `${this.props.match.path}/${item.path}`;
      if (path === pathname && item.name !== '首页') {
        this.setState({
          defKey: item.id
        });
        this.props.dispatch({type: 'ACTIVEMENU', active: item.name});
      }
    });
  }

  componentDidMount() {
    this.props.dispatch(rquestFuncMenu());

    this.props.history.listen(route => {
      this.getActiveMenu(route.pathname, this.props.menuList);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuList !== this.props.menuList) {
      this.getActiveMenu(this.props.history.location.pathname, nextProps.menuList);
    }
  }

  /**
   * @description 渲染单个导航菜单
   * @returns
   */
  renderMenuItem(menus, path) {
    const {match} = this.props;
    const menuItem = menus.map((menu, i) => (
      isEmpty(menu.childList) ?
        <Menu.Item key={i} >
          <NavLink key={menu.id} to={path ? `${match.path}/${path}/${menu.path}` : `${match.path}/${menu.path}`}>
            {menu.icon ? <Icon type={menu.icon} /> : ''}
            <span>{menu.name}</span>
          </NavLink>
        </Menu.Item>
        :
        <SubMenu
          key={i}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </span>
          }
        >
          {this.renderMenuItem(menu.childList, menu.path)}
        </SubMenu>
    ));
    return menuItem;
  }

  render() {
    const {menuList, collapsed} = this.props;
    return (
      <div className="layout_sider" style={{width: collapsed ? 80 : 256}}>
        <div className="index-logo">
          <NavLink to="/app"><h1 style={{display: collapsed ? 'none' : 'block'}}>react-blog</h1></NavLink>
        </div>
        {/* defaultOpenKeys={[this.state.defKey]}
          defaultSelectedKeys={[this.state.defKey]} */}
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          {this.renderMenuItem(menuList)}
        </Menu>
      </div>
    );
  }
}

