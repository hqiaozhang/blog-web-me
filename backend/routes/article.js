/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-27 16:35:32 
 * @Email: 991034150@qq.com 
 * @Description: 文章管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 16:37:00
 */


const Article = require('../models/article'); 
const CONSTANT = require('../core/constant')
const rescode = CONSTANT.RESCODE 
import {  responseClient } from '../util/util.js';
 
// 查询列表
exports.getArticleList = (req, res) => {
  Article.find()
    .then(data => {
      if (data) { 
        responseClient(res, 200, rescode.success, '成功', data);
      } else {
        responseClient(res, 200, rescode.error, '失败');
      }
    })
    .catch(err => {
      responseClient(res);
    });
};

// 新增文章
exports.addArticle = (req, res) => {
  const {
    title,
    author,
    keyword,
    content,
    desc,
    img_url,
    tags,
    category,
    state,
    type,
    origin,
  } = req.body;
  let tempArticle = new Article({
    title,
    author,
    keyword: keyword ? keyword.split(',') : [],
    content,
    desc,
    img_url,
    tags: tags ? tags.split(',') : [],
    category,
    state,
    type,
    origin,
  })
  // 每个 document 会在调用他的 save 方法后保存到数据库
  tempArticle.save()
    .then(data => {
      responseClient(res, 200, rescode.success, '保存成功', data);
    if(data) {
      console.log(data)
    }
  })
}

// 删除文章
exports.deleteArticle = (req, res) => {
  let { _id } = req.body;
  Article.deleteMany({ _id: _id })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, rescode.success, '删除成功!');
      } else {
        responseClient(res, 200, rescode.error, '文章不存在');
      }
    })
    .catch(err => {
      console.error('err :', err);
      responseClient(res);
    });
}

// 更新文章
exports.updateArticle = (req, res) => {

  const {
    title,
    author,
    keyword,
    content,
    desc,
    img_url,
    tags,
    category,
    state,
    type,
    origin,
    id,
  } = req.body;
  Article.update(
    { _id: req.body._id },
    {
      title,
      author,
      keyword: keyword ? keyword.split(',') : [],
      content,
      desc,
      img_url,
      category,
      tags: tags ? tags.split(',') : [], 
      state,
      type,
      origin,
    },
  )
    .then(result => { 
      responseClient(res, 200, rescode.success, '操作成功', result);
    })
    .catch(err => {
      console.error(err);
      responseClient(res);
    });
};