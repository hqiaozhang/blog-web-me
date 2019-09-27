/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 17:43:40
 * @Email: 991034150@qq.com
 * @Description: 文章管理API
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 16:45:00
 */


// 查询文章列表
const fetchArticleList = {
  url: '/article/list',
  config: {
    method: 'POST',
  }
};

// 新增文章
const fetchArticleAdd = {
  url: '/article/add',
  config: {
    method: 'POST',
    isMsg: true
  }
};

// 删除文章
const fetchArticleDel = {
  url: '/article/del',
  config: {
    method: 'POST',
    isMsg: true
  }
};

// 更新文章
const fetchArticleUpdate = {
  url: '/article/update',
  config: {
    method: 'POST',
    isMsg: true
  }
};


export {
  fetchArticleList,
  fetchArticleAdd,
  fetchArticleDel,
  fetchArticleUpdate
};
