 
const User = require('../models/user');
const Config = require('../models/config') 
import { MD5_SUFFIX, responseClient, md5 } from '../util/util.js';
const Funcmenu = require('../models/funcmenu');

// 登录
exports.login = (req, res) => {
  let { username, password } = req.body;
  if (!username) {
    responseClient(res, 400, 2, '用户名不可为空');
    return;
  }
  if (!password) {
    responseClient(res, 400, 2, '密码不可为空');
    return;
  }
  User.findOne({
    username,
    password
    // password: md5(password + MD5_SUFFIX),
  })
    .then(data => {
      if (data) {
        //登录成功后设置session
        req.session.userInfo = data;
        res.cookie('admin_token', 'true')
        responseClient(res, 200, 200, '登录成功', data);
      } else {
        responseClient(res, 200, 300, '用户名或者密码错误');
      }
    })
    .catch(err => {
      responseClient(res);
    });
};


// 菜单查询
exports.getFuncMenu = (req, res) => {
  Funcmenu.find()
    .then(data => {
      if(data) {
        responseClient(res, 200, 200, '查询成功', data);
      }
    })
}

// 项目配置查询
exports.getConfig = (req, res) => {
  Config.find()
    .then(data => {
      if(data) {
        responseClient(res, 200, 200, '查询成功', data);
      }
    })
}