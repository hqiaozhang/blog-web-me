import React, {Component} from 'react';
import {Row, Col, Tag, Icon, message, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {rquestAllConfig} from '@/actions/users';

import {rquestListproject, rquestDelproject} from '@/actions/project';
import './index.scss';

const mapStateToProps = ({common, project}) => ({
  ptype: common.config,
  projectList: project.projectList,
  status: project.status
});

@connect(mapStateToProps)
export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGroup: [],
    };
  }
  handleDel(id) {
    this.props.dispatch(rquestDelproject({id}));
  }
  handleEdit(item) {
    this.props.history.push(`/app/project/create/${item._id}`);
  }
  handleOpenHref(item) {
    window.open(item.url);
  }
  componentDidMount() {
    this.props.dispatch(rquestListproject());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.projectList !== this.props.projectList) {
      const {projectList} = nextProps;
      const lenG = Math.ceil(projectList.length / 4);
      const listGroup = [];
      let preIndex = 0;
      let nextIndex = 4;
      for (let i = 0; i < lenG; i++) {
        listGroup.push(projectList.slice(preIndex, nextIndex));
        preIndex = nextIndex;
        nextIndex += 4;
      }
      this.setState({
        listGroup
      });
    }
    if (this.props.status !== nextProps.status && nextProps.status === 200) {
      message.info('删除成功');
      this.props.dispatch(rquestListproject());
    }
  }
  render() {
    return (
      <div className="project">
        <div className="ant-card">
          <span>属于类目：</span>
          <Tag color="#2db7f5">可视化</Tag>
          <Tag color="#2db7f5">后台管理</Tag>
          <Tag color="#2db7f5">APP</Tag>
          <Tag color="#2db7f5">微信小程序</Tag>
        </div>
        <div className="projects_cardList">
          {this.state.listGroup.map((itemG, i) => (
            <Row gutter={16} className="ant-list-item" key={i}>
              {itemG.map(item => (
                <Col key={item.id} className="gutter-row" span={6}>
                  <div className=" ant-card ant-card-hoverable ant-card-bordered">
                    <div className="operation">
                      <Popconfirm placement="topLeft" title="确认删除该项目" onConfirm={this.handleDel.bind(this, item._id)} okText="确定" cancelText="取消">
                        <Icon type="delete" />
                      </Popconfirm>
                      <Icon onClick={this.handleEdit.bind(this, item)} type="edit" />
                    </div>
                    <div className="ant-card-cover"><img src={`/static/images/projects/${item.img}.png`} /></div>
                    <div className="ant-card-body" onClick={this.handleOpenHref.bind(this, item)}>
                      <div className="ant-card-meta"><div className="ant-card-meta-detail">
                        <div className="ant-card-meta-title"><a>{item.title}</a></div>
                        <div className="ant-card-meta-description">
                          <div className="ant-typography ant-typography-ellipsis ant-typography-ellipsis-multiple-line"> {item.content}</div></div></div></div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </div>

      </div>
    );
  }
}

