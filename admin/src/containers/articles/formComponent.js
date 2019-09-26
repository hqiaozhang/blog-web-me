import React, {Component} from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';

const {TextArea} = Input;
const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;
const atype = ['JavaScript', 'Jquery', 'CSS(3)', 'HTML(5)', 'ES6', 'React', 'Vue', 'Webpack', 'Node', 'MongoDB'];
const categorys = [];
for (let i = 0; i < atype.length; i++) {
  categorys.push(<Option key={atype[i]}>{atype[i]}</Option>);
}
class ArticleForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      // 重置一组输入控件的值（为 initialValue）与状态
      this.props.form.resetFields();
    }
  }
  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 28},
        sm: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
      },
    };
    const {
      title, author, keyword, desc, content, category
    } = this.props.params;
    // this.props.form.setFieldsValue({
    //   title,
    //   author,
    //   keyword,
    //   desc,
    //   content,
    //   category
    // });
    return (
      <Form {...formItemLayout} onSubmit={this.props.onSubmit.bind(this, this.props.form)} >

        <Form.Item label="标题">
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [{required: true, message: '请输入文章标题'}],
          })(<Input placeholder="标题" />)}
        </Form.Item>

        <Form.Item label="文章类型">
          {
            getFieldDecorator('category', {
              initialValue: category,
              rules: [{required: true, message: '请选择文章类型'}],
            })(<Select
              onChange={this.props.handleCategory}
              style={{width: '100%'}}
              placeholder="选择文章类型"
            >
              {categorys}
            </Select>)
          }
        </Form.Item>

        <Form.Item label="作者">
          {
            getFieldDecorator('author', {
              initialValue: author,
            })(<Input placeholder="作者" />)
          }
        </Form.Item>

        <Form.Item label="关键字">
          {
            getFieldDecorator('keyword', {
              initialValue: keyword,
            })(<Input placeholder="关键字" />)
          }
        </Form.Item>

        <Form.Item label="desc">
          {
            getFieldDecorator('desc', {
              initialValue: keyword,
            })(<Input placeholder="描述" />)
          }
        </Form.Item>

        <Form.Item label="文章内容" >
          {getFieldDecorator('content', {
            initialValue: content,
            rules: [{required: true, message: '请输入文章内容'}],
          })(<TextArea rows="7" placeholder="请输入内容" />)}
        </Form.Item>
        <Row
          type="flex"
          gutter={24}
          justify="center"
        >
          {/* 提交按钮 */}
          <Col><Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >提交</Button>
          </Form.Item></Col>

          {/* 取消按钮 */}
          <Col><Button
            style={{marginTop: '4px'}}
            onClick={this.props.onCancel}
          >取消</Button></Col>
        </Row>
      </Form>
    );
  }
}

const WrappedArticleForm = Form.create({name: 'register'})(ArticleForm);
export default WrappedArticleForm;
