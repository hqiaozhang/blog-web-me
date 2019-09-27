/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-26 13:16:33
 * @Email: 991034150@qq.com
 * @Description: 主布局页面
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 15:52:54
 */


import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Layout, Icon} from 'antd';
import {connect} from 'react-redux';
import SiderMenu from '@/containers/siderMenu';
import Header from '@/containers/header';
// 首页
import Home from '@/containers/home';
// 文章管理
import ArticlesList from '@/containers/articles/list';
// 项目管理
import Project from '@/containers/project';

const mapStateToProps = ({common}) => ({
  collapsed: common.collapsed
});
@connect(mapStateToProps)
class PrimaryContainer extends Component {
  render() {
    const {match, history} = this.props;

    return (
      <Layout className="ant-layout main_container">
        <aside className="layout_sider">
          <SiderMenu history={history} match={match} />
        </aside>
        <section className={this.props.collapsed ? 'left_collapsed right_layout' : 'right_layout'}>
          <Header />
          <div className="index_content">
            <div className="right_content_main">
              <Switch>
                <Route path={`${match.path}`} exact component={Home} />
                <Route path={`${match.path}/article`} component={ArticlesList} />
                <Route path={`${match.path}/project`} component={Project} />
              </Switch>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default PrimaryContainer;
