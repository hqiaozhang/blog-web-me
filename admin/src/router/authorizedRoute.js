/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-26 13:40:49
 * @Email: 991034150@qq.com
 * @Description: 权限验证路由组件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 13:48:02
 */


import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const stateToProps = ({common}) => ({
  logged: common.logged
});

 @connect(stateToProps)
export default class AuthorizedRoute extends React.Component {
   /**
    * @description 根据登录状态，渲染不同组件
    * @returns  渲染的组件
    * @memberof AuthorizedRoute
    */
   render() {
     const {
       component: Component, logged, ...rest
     } = this.props;
     return (
       <Route
         {...rest}
         render={props => logged
           ? <Component {...props} />
           : <Redirect to="/auth/login" />}
       />
     );
   }
 }

