/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-23 09:40:21 
 * @Email: 991034150@qq.com 
 * @Description: 文章页(列表页)
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-23 15:49:16
 */

import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getQueryStringByName,
} from '@/utils/utils';
 /*actions*/
import { saveArticlesList, getArticlesList } from '@/store/actions/articles';
const mapStateToProps = ({ home }) => {
  
  return {
   
  }
}

@connect(mapStateToProps)
// @connect(
//   state => state.articles,
//   { saveArticlesList },
// )
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadEnd: false,
      isLoading: false,
      keyword: '',
      likes: '', // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      tag_id: getQueryStringByName('tag_id'),
      tag_name: decodeURI(getQueryStringByName('tag_name')),
      category_id: getQueryStringByName('category_id'),
      pageNum: 1,
      pageSize: 10,
      articlesList: [],
      total: 0,
    }
    this.getBlog = this.getBlog.bind(this);
  }
  getBlog() {
    let params = {
      keyword: this.state.keyword,
      likes: this.state.likes,
      state: this.state.state,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    
    return params
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getArticlesList(this.getBlog()))
  }
   render() {
    console.log(this.props)
     return (
       <div>Articles</div>
     )
   }
}

export default Articles;
