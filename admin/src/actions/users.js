/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 10:17:53
 * @Email: 991034150@qq.com
 * @Description: 用户信息
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 15:12:07
 */

import {fetch} from '@/utils/request';
import * as types from './types';

// 登录成功
const LoginSuccess = (data) => ({
  type: types.LOGINSUCCESS,
  data,
});

// 左边菜单查询成功
const funcMenuSuccess = (data) => ({
  type: types.GETFUNCMENUSUCCESS,
  data,
});

// 登录
export const rquestLogin = (pramas) => dispatch => fetch('fetchLogin', {...pramas}, (data) => {
  dispatch(LoginSuccess(data));
});

// 左边菜单查询
export const rquestFuncMenu = (pramas) => dispatch => fetch('fetchGetFuncMenu', {...pramas}, (data) => {
  dispatch(funcMenuSuccess(data));
});

