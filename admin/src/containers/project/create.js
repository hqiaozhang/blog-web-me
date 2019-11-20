/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-27 15:54:24
 * @Email: 991034150@qq.com
 * @Description: 创建项目
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-11-20 17:40:34
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';


import {Form, Select, Input, Button, Row, Col, message} from 'antd';
import {rquestAddproject, rquestDetailproject, rquestUpdateProject} from '@/actions/project';
import {rquestAllConfig} from '@/actions/users';

const {Option} = Select;
const mapStateToProps = ({common, project}) => ({
  ptype: common.config[0] ? common.config[0].project : [],
  status: project.status,
  detail: project.detail
});

@connect(mapStateToProps)
class ProjectCreate extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const {id} = this.props.match.params;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (id) {
          this.props.dispatch(rquestUpdateProject({id, ...values}));
        } else {
          this.props.dispatch(rquestAddproject(values));
        }
      }
    });
  };


  // 重置表单
  handleRest = e => {
    this.props.form.resetFields();
  }

  // 返回
  handleBack = e => {
    this.props.history.go(-1);
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.dispatch(rquestAllConfig());
    // 有id表示编辑，先查询详情
    if (id) {
      this.props.dispatch(rquestDetailproject({id}));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status && nextProps.status === 200) {
      message.info('项目新增成功');
      this.props.dispatch({type: 'UPDATEPROSTATUS', code: 0});
      this.handleRest();
      this.handleBack();
    }
    // 编辑的时候才赋值
    if (this.props.detail !== nextProps.detail && this.props.match.params.id) {
      this.props.form.setFieldsValue({
        title: nextProps.detail.title,
        content: nextProps.detail.content,
        url: nextProps.detail.url,
        img: nextProps.detail.img,
        category: nextProps.detail.category
      });
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
          <Form.Item label="项目地址">
            {getFieldDecorator('url', {
              rules: [{required: true, message: '请输入项目地址'}],
            })(<Input placeholder="请输入项目地址" />)}
          </Form.Item>
          <Form.Item label="图片名称">
            {getFieldDecorator('img', {
              rules: [{required: true, message: '请输入图片名称'}],
            })(<Input placeholder="请输入图片名称" />)}
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
            <Col> <Button type="primary" htmlType="submit"> 保存 </Button></Col>
            {/* 重置按钮 */}
            {/* <Col> <Button onClick={this.handleRest}> 重置 </Button></Col> */}
            <Col> <Button onClick={this.handleBack}> 返回 </Button></Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedCreate = Form.create({name: 'coordinated'})(ProjectCreate);
export default WrappedCreate;

