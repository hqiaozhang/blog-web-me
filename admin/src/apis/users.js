/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 10:12:28
 * @Email: 991034150@qq.com
 * @Description: 用户管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 13:16:44
 */

// 登录
const fetchLogin = {
  url: '/users/login',
  config: {
    method: 'POST',
    // contentType: 'multipart/form-data',
    isMsg: true, // 是否需要后端的msg
  }
};

// 获取菜单
const fetchGetFuncMenu = {
  url: '/users/getFuncMenu'
};


const fetchGetConfig = {
  url: '/users/getConfig'
};

export {
  fetchLogin,
  fetchGetFuncMenu,
  fetchGetConfig
};

