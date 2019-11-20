/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-26 11:58:09
 * @Email: 991034150@qq.com
 * @Description: reducers公用
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-10-21 15:14:09
 */

import * as types from '@/actions/types';
import {getCookie} from '@/utils/util';

const token = getCookie('admin_token');
const initialState = {
  // logged: !!token,
  logged: true,
  collapsed: false,
  menuList: [],
  activeMenu: '',
  config: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.MENUCOLLAPSED: // 左边菜单展开收起
      return Object.assign({}, state, {
        collapsed: !action.collapsed,
      });
    case types.GETFUNCMENUSUCCESS: // 左边菜单获取成功
      return Object.assign({}, state, {
        menuList: action.data,
      });
    case types.ACTIVEMENU: // 菜单当前选中项
      return Object.assign({}, state, {
        activeMenu: action.active,
      });
    case types.CONFIGSUCCESS: // 菜单当前选中项
      return Object.assign({}, state, {
        config: action.data,
      });
    default:
      return state;
  }
}
