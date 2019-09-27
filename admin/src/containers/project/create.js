/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-27 15:54:24
 * @Email: 991034150@qq.com
 * @Description: 创建项目
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 17:30:12
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';


import {Form, Select, Input, Button, Row, Col, message} from 'antd';
import {rquestAddproject} from '@/actions/project';
import {rquestAllConfig} from '@/actions/users';

const {Option} = Select;
const mapStateToProps = ({common, project}) => ({
  ptype: common.config[0] ? common.config[0].project : [],
  status: project.status,
});

@connect(mapStateToProps)
class ProjectCreate extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(rquestAddproject(values));
      }
    });
  };


  // 重置表单
  handleRest = e => {
    this.props.form.resetFields();
  }

  componentDidMount() {
    this.props.dispatch(rquestAllConfig());
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status && nextProps.status === 200) {
      message.info('项目新增成功');
      this.props.dispatch({type: 'UPDATEPROSTATUS', code: 0});
      this.handleRest();
    }
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="ant-card">
        <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
          <Form.Item label="项目名称">
            {getFieldDecorator('title', {
              rules: [{required: true, message: '请输入项目名称'}],
            })(<Input placeholder="请输入项目名称" />)}
          </Form.Item>
          <Form.Item label="项目简介">
            {getFieldDecorator('content', {
              rules: [{required: true, message: '请输入项目简介'}],
            })(<Input placeholder="请输入项目简介" />)}
          </Form.Item>
          <Form.Item label="图片名称">
            {getFieldDecorator('img', {
              rules: [{required: true, message: '请输入项目名称'}],
            })(<Input placeholder="请输入项目名称" />)}
          </Form.Item>
          <Form.Item label="所属类别">
            {getFieldDecorator('category', {
              rules: [{required: true, message: '请选择所属类别!'}],
            })(<Select
              placeholder="请选择所属类别"
            >
              {
                this.props.ptype.map(item => (
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                ))
              }

            </Select>)}
          </Form.Item>
          <Row
            type="flex"
            gutter={24}
            justify="center"
          >
            {/* 提交按钮 */}
            <Col><Form.Item>
              <Button type="primary" htmlType="submit"> 保存 </Button>
            </Form.Item></Col>

            {/* 重置按钮 */}
            <Col> <Button onClick={this.handleRest}> 重置 </Button></Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedCreate = Form.create({name: 'coordinated'})(ProjectCreate);
export default WrappedCreate;

