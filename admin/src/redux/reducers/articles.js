/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 17:46:21
 * @Email: 991034150@qq.com
 * @Description: 文章管理reducers
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-25 17:08:08
 */


import * as types from '@/actions/types';

const initialState = {
  articleList: [],
  status: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ARTICLELISTSUCCESS: // 登录成功
      return Object.assign({}, state, {
        articleList: action.data,
        status: 0,
      });
    case types.ARTICLEDELSUCCESS: // 删除
    case types.ARTICLEADDSUCCESS: // 新增
    case types.ARTICLEUPDATESUCCESS: // 更新
      return Object.assign({}, state, {
        status: action.data.code
      });
    default:
      return state;
  }
}
