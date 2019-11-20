/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-27 15:48:57
 * @Email: 991034150@qq.com
 * @Description: 项目管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-11-20 17:17:22
 */

import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import ProjectList from './list';
import ProjectCreate from './create';

export default class Project extends Component {
  render() {
    const {match} = this.props;
    return (
      <Switch>
        <Route path={`${match.path}`} exact component={ProjectList} />
        <Route path={`${match.path}/list`} exact component={ProjectList} />
        <Route path={`${match.path}/create`} exact component={ProjectCreate} />
        <Route path={`${match.path}/create/:id`} component={ProjectCreate} />
      </Switch>

    );
  }
}
