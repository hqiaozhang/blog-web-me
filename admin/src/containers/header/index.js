import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import Breadcrumbs from './breadcrumb';
import './index.scss';

const mapStateToProps = ({common}) => ({
  collapsed: common.collapsed
});
@connect(mapStateToProps)
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSlide = e => {
    this.props.dispatch({type: 'MENUCOLLAPSED', collapsed: this.props.collapsed});
  }
  render() {
    return (
      <div>
        <div className="layout_header">
          <Icon onClick={this.handleSlide.bind(this)} type="menu-fold" />
        </div>
        {/* 面包屑 */}
        <Breadcrumbs />

      </div>
    );
  }
}

