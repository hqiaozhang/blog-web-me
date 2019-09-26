/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-26 11:58:09
 * @Email: 991034150@qq.com
 * @Description: reducers公用
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 16:40:08
 */

import * as types from '@/actions/types';
import {getCookie} from '@/utils/util';

const token = getCookie('admin_token');
const initialState = {
  logged: !!token,
  collapsed: false,
  menuList: []
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
    default:
      return state;
  }
}
