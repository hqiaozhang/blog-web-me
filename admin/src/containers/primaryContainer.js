/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-26 13:16:33
 * @Email: 991034150@qq.com
 * @Description: 主布局页面
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 16:34:44
 */


import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Layout, Icon} from 'antd';
import {connect} from 'react-redux';
import SiderMenu from '@/containers/siderMenu';
import Header from '@/containers/header';
import Home from '@/containers/home';
import ArticlesList from '@/containers/articles/list';

const mapStateToProps = ({common}) => ({
  collapsed: common.collapsed
});
@connect(mapStateToProps)
class PrimaryContainer extends Component {
  render() {
    const {match} = this.props;
    return (
      <Layout className="ant-layout main_container">
        <aside className="layout_sider">
          <SiderMenu match={match} />
        </aside>
        <section className={this.props.collapsed ? 'left_collapsed right_layout' : 'right_layout'}>
          <Header />
          <div className="index_content">
            <div className="right_content_main">
              <div className="ant-card" >
                <Switch>
                  <Route path={`${match.path}`} exact component={Home} />
                  <Route path={`${match.path}/article`} exact component={ArticlesList} />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default PrimaryContainer;
