/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-27 16:52:11
 * @Email: 991034150@qq.com
 * @Description: 项目管理 actions
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 17:11:07
 */


import {fetch} from '@/utils/request';
import * as types from './types';


// 新增项目成功
const projectAddSuccess = (data) => ({
  type: types.PROJECTADDSUCCESS,
  data,
});

// 查询项目列表成功
const projectListSuccess = (data) => ({
  type: types.PROJECTLISTSUCCESS,
  data,
});

// 删除项目列表成功
const projectDelSuccess = (data) => ({
  type: types.PROJECTDELSUCCESS,
  data,
});

// 更新成功
const projectUpdateSuccess = (data) => ({
  type: types.PROJECTUPDATESUCCESS,
  data,
});

// 新增项目
export const rquestAddproject = (pramas) => dispatch => fetch('fetchProjectAdd', {...pramas}, (data) => {
  dispatch(projectAddSuccess(data));
});

// 查询项目列表
export const rquestListproject = (pramas) => dispatch => fetch('fetchProjectList', {...pramas}, (data) => {
  dispatch(projectListSuccess(data));
});


// 删除项目列表
export const rquestDelproject = (pramas) => dispatch => fetch('fetchProjectDel', {...pramas}, (data) => {
  dispatch(projectDelSuccess(data));
});

// 编辑（更新）项目
export const rquestUpdateproject = (pramas) => dispatch => fetch('fetchProjectUpdate', {...pramas}, (data) => {
  dispatch(projectUpdateSuccess(data));
});
