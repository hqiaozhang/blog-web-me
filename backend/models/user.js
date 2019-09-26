/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-24 14:16:33 
 * @Email: 991034150@qq.com 
 * @Description: 权限和用户数据模型
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-24 14:20:34
 */
 
 

const crypto = require('crypto');
const { argv } = require('yargs');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');
// 每个 schema 都会映射到一个 MongoDB collection
const adminSchema = new mongoose.Schema({

  // 名字
  fullname: { type: String, required: true, default: '' },

  //用户类型 0：博主，1：其他用户 ，2：github， 3：weixin， 4：qq ( 0，1 是注册的用户； 2，3，4 都是第三方授权登录的用户)
  type: { type: Number, default: 1 },

  // 手机
  phone: { type: String, default: '' },

  // 地址
  username: { type: String, default: 'username' },

  // 密码
  password: {
    type: String,
    required: true,
    default: crypto
      .createHash('md5')
      .update(argv.auth_default_password || 'root')
      .digest('hex'),
  },

  // 创建日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
});

// 自增 ID 插件配置
adminSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model('User', adminSchema);
