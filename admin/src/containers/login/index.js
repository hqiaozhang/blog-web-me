/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-23 16:57:07
 * @Email: 991034150@qq.com
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 15:34:15
 */
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {connect} from 'react-redux';
import {rquestLogin} from '@/actions/users';

import './index.scss';

const mapStateToProps = ({users}) => ({
  userinfo: users.userinfo,
});
@connect(mapStateToProps)
class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(rquestLogin(values));
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    const {userinfo} = nextProps;
    if (this.props.userinfo !== nextProps.userinfo) {
      if (userinfo.code !== 200) {
        message.info(userinfo.message);
      } else {
        message.info(userinfo.message);
        this.props.history.push('/app');
      }
    }
  }

  render() {
    // 用于和表单进行双向绑定
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login_container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(<Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="Username"
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(<Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
              type="password"
              placeholder="Password"
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
            Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
          Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginContainer = Form.create({name: 'normal_login'})(NormalLoginForm);
export default LoginContainer;
