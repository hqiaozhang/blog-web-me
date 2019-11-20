/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-27 16:42:35
 * @Email: 991034150@qq.com
 * @Description: 项目管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-29 13:37:14
 */


// 查询项目列表
const fetchProjectList = {
  url: '/project/list',
  config: {
    method: 'POST',
  }
};

// 详情查询
const fetchProjectDetail = {
  url: '/project/detail',
};

// 新增项目
const fetchProjectAdd = {
  url: '/project/add',
  config: {
    method: 'POST',
    isMsg: true
  }
};

// 删除项目
const fetchProjectDel = {
  url: '/project/del',
  config: {
    method: 'POST',
    isMsg: true
  }
};

// 更新项目
const fetchProjectUpdate = {
  url: '/project/update',
  config: {
    method: 'POST',
    isMsg: true
  }
};


export {
  fetchProjectList,
  fetchProjectAdd,
  fetchProjectDel,
  fetchProjectUpdate,
  fetchProjectDetail
};
