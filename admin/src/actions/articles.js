/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 10:17:53
 * @Email: 991034150@qq.com
 * @Description: 文章管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-25 17:08:22
 */

import {fetch} from '@/utils/request';
import * as types from './types';


// 新增文章成功
const articleAddSuccess = (data) => ({
  type: types.ARTICLEADDSUCCESS,
  data,
});

// 查询文章列表成功
const articleListSuccess = (data) => ({
  type: types.ARTICLELISTSUCCESS,
  data,
});

// 删除文章列表成功
const articleDelSuccess = (data) => ({
  type: types.ARTICLEDELSUCCESS,
  data,
});

// 更新成功
const articleUpdateSuccess = (data) => ({
  type: types.ARTICLEUPDATESUCCESS,
  data,
});

// 新增文章
export const rquestAddArticle = (pramas) => dispatch => fetch('fetchArticlesAdd', {...pramas}, (data) => {
  dispatch(articleAddSuccess(data));
});

// 查询文章列表
export const rquestListArticle = (pramas) => dispatch => fetch('fetchArticlesList', {...pramas}, (data) => {
  dispatch(articleListSuccess(data));
});


// 删除文章列表
export const rquestDelArticle = (pramas) => dispatch => fetch('fetchArticlesDel', {...pramas}, (data) => {
  dispatch(articleDelSuccess(data));
});

// 编辑（更新）文章
export const rquestUpdateArticle = (pramas) => dispatch => fetch('fetchArticlesUpdate', {...pramas}, (data) => {
  dispatch(articleUpdateSuccess(data));
});
