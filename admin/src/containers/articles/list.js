/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 16:42:27
 * @Email: 991034150@qq.com
 * @Description: 文章列表
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 13:49:44
 */

import React, {Component} from 'react';
import {Modal, Button, Table, Tag} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  rquestListArticle,
  rquestAddArticle, rquestDelArticle, rquestUpdateArticle
} from '@/actions/articles';
import WrappedArticleForm from './formComponent';
import './index.scss';

const mapStateToProps = ({articles}) => ({
  articleList: articles.articleList,
  status: articles.status,
});
@connect(mapStateToProps)
export default class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editType: 0,
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
        },
        {
          title: '关键字',
          dataIndex: 'keyword',
          render: arr => (
            <span>
              {arr.map(item => (
                <span color="magenta" key={item}>
                  {item}
                </span>
              ))}
            </span>
          ),
        },
        // {
        //   title: '标签',
        //   dataIndex: 'tags',
        //   render: arr => (
        //     <span>
        //       {arr.map(item => (
        //         <Tag color="cyan" key={item.id}>
        //           {item.name}
        //         </Tag>
        //       ))}
        //     </span>
        //   ),
        // },
        {
          title: '分类',
          dataIndex: 'category',
          render: record => (
            <Tag color="blue" key={record}>
              {record}
            </Tag>
          ),
        },
        // {
        //   title: '状态',
        //   dataIndex: 'state',
        //   width: 70,
        //   render: val => {
        //     // 文章发布状态 => 0 草稿，1 已发布
        //     if (val === 0) {
        //       return <Tag color="red">草稿</Tag>;
        //     }
        //     if (val === 1) {
        //       return <Tag color="green">已发布</Tag>;
        //     }
        //   },
        // },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          width: 150,
          render: (text, record) => (
            <div className="operation">
              <a onClick={() => this.showModal(1, record)}>编辑</a>
              <a target="_blank"> 详情 </a>
              <a onClick={() => this.handleDelete(record)}>删除</a>
            </div>
          ),
        },
      ],
      params: {
        title: '',
        author: 'admin',
        keyword: '',
        desc: '',
        content: '',
        category: ''
      }
    };
  }

  /**
   * @description 显示弹层
   */
  showModal = (type, record) => {
    this.setState({
      visible: true,
    });
    // 修改
    if (type === 1) {
      this.setState({
        editType: 1,
        params: record
      });
    } else {
      // 新增
      this.setState({
        editType: 0,
        params: {
          title: '',
          author: 'admin',
          keyword: '',
          desc: '',
          content: '',
          category: ''
        }
      });
    }
  };
  // 点击确定
  handleOk = (values) => {
    this.setState({
      visible: false,
    });
    const params = values;
    const {keyword, tags, author} = params;
    if (keyword instanceof Array) {
      params.keyword = keyword.join(',');
    }
    if (tags instanceof Array) {
      params.tags = tags.join(',');
    }
    if (!author) {
      params.author = 'admin';
    }
    params._id = this.state.params._id;
    if (this.state.editType === 1) {
      this.props.dispatch(rquestUpdateArticle(params));
    } else {
      this.props.dispatch(rquestAddArticle(params));
    }
  };


   handleDelete = (record) => {
     this.props.dispatch(rquestDelArticle(record));
   }

  //  取消文章新增
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  // 提交表单
  handleFormSubmit = (form, e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.handleOk(values);
      }
    });
  }
  componentDidMount() {
    this.props.dispatch(rquestListArticle());
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status && nextProps.status === 200) {
      this.props.dispatch(rquestListArticle());
    }
  }
  render() {
    const {articleList, total} = this.props;

    const {pageNum, pageSize, editType} = this.state;
    const pagination = {
      total,
      defaultCurrent: pageNum,
      pageSize,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        // console.log('current, pageSize :', current, pageSize);
        this.handleChangePageParam(current, pageSize);
      },
      onChange: (current, pageSize) => {
        this.handleChangePageParam(current, pageSize);
      },
    };
    return (
      <div className="article_list" >
        <div className="buttons"><Button type="primary" onClick={() => this.showModal()}>新增</Button></div>
        <Table
          size="middle"
          rowKey="id"
          columns={this.state.columns}
          dataSource={articleList}
        />
        <Modal
          width="650px"
          title={!editType ? '新增文章' : '编辑文章'}
          okText="确认"
          cancelText="取消"
          footer={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <WrappedArticleForm
            visible={this.state.visible}
            params={this.state.params}
            onSubmit={this.handleFormSubmit}
            onCancel={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}

