/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-27 16:33:57 
 * @Email: 991034150@qq.com 
 * @Description: 项目管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 18:06:05
 */

const Project = require('../models/project'); 
const CONSTANT = require('../core/constant')
const rescode = CONSTANT.RESCODE 
import {  responseClient } from '../util/util.js';
 
// 查询列表
exports.getProjectList = (req, res) => {
  Project.find()
    .then(data => {
      if(data) {
        responseClient(res, 200, rescode.success, '成功', data);
      }
    })  
    .catch(err => {
      responseClient(res);
    });
}


// 创建项目
exports.addProject = (req, res) => {
  const {
    title,
    content,
    img,
    category,
  } = req.body;
  let tempProject = new Project({
    title,
    content,
    img,
    category,
  })
  // 每个 document 会在调用他的 save 方法后保存到数据库
  tempProject.save()
    .then(data => {
      responseClient(res, 200, rescode.success, '保存成功', data);
    if(data) {
      console.log(data)
    }
  })
}

// 删除项目
exports.deleteProject = (req, res) => {
  let { id } = req.body;
  Article.deleteMany({ _id: id })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, rescode.success, '删除成功!');
      } else {
        responseClient(res, 200, rescode.error, '项目不存在');
      }
    })
    .catch(err => {
      console.error('err :', err);
      responseClient(res);
    });
}