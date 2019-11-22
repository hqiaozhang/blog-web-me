/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-27 16:33:57 
 * @Email: 991034150@qq.com 
 * @Description: 项目管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-11-22 14:33:40
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
    imgUrl,
    category,
  } = req.body;
  let tempProject = new Project({
    title,
    content,
    imgUrl,
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
  Project.deleteMany({ _id: id })
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



// 更新项目
exports.updateProject = (req, res) => {
  const {
    title,
    content,
    imgUrl,
    category,
    url,
    id,
  } = req.body; 
  Project.update(
    { _id: id },
    {
      title,
      content,
      imgUrl,
      url,
      category,
    },
  )
    .then(data => {  
      if (data.n === 1) {
        responseClient(res, 200, rescode.success, '操作成功', '更新成功');
      } else {
        responseClient(res, 200, rescode.error, '更新失败');
      }
    })
    .catch(err => {
      console.error(err);
      responseClient(res);
    });
};


// 查询详情
exports.getProjectDetail = (req, res) => {
  let { id } = req.query;  
  Project.findOne({ _id: id })
    .then(data => { 
      responseClient(res, 200, rescode.success, '操作成功！', data);
    })
    .catch(err => {
      console.error('err :', err);
      responseClient(res);
    });
};

// 上传图片
const uploadImg = require('./uploadImg');
exports.uploadProjectImg = (req, res) => { 
  uploadImg(req, res)
}