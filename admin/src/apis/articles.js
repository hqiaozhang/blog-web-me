/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-24 17:43:40
 * @Email: 991034150@qq.com
 * @Description: 文章管理API
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-25 17:08:52
 */


// 查询文章列表
const fetchArticlesList = {
  url: '/article/getArticleList',
  config: {
    method: 'POST',
  }
};

// 新增文章
const fetchArticlesAdd = {
  url: '/article/add',
  config: {
    method: 'POST',
    isMsg: true
  }
};

// 删除文章
const fetchArticlesDel = {
  url: '/article/del',
  config: {
    method: 'POST',
    isMsg: true
  }
};

// 更新文章
const fetchArticlesUpdate = {
  url: '/article/update',
  config: {
    method: 'POST',
    isMsg: true
  }
};


export {
  fetchArticlesList,
  fetchArticlesAdd,
  fetchArticlesDel,
  fetchArticlesUpdate
};
