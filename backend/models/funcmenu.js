/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-26 14:38:34 
 * @Email: 991034150@qq.com 
 * @Description: 左边菜单
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-26 15:27:04
 */


const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 文章模型
const funcmenuSchema = new mongoose.Schema({
  // 菜单名
  name: { type: String, required: true},

  // 菜单路由
  path: { type: String, required: true},

  // 菜单图标
  icon: { type: String, required: true},

  // 子菜单
  childList: { type: Array, required: true},
})

// 自增 ID 插件配置
funcmenuSchema.plugin(autoIncrement.plugin, {
	model: 'Funcmenu',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 文章模型
module.exports = mongoose.model('Funcmenu', funcmenuSchema);