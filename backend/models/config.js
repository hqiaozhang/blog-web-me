/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-27 13:10:43 
 * @Email: 991034150@qq.com 
 * @Description: 字典配置查询
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-27 13:21:49
 */
 

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 分类集合模型
const configSchema = new mongoose.Schema({
	// 分类名称
	// project: [{ name: String, code: String}]
});


//自增 ID 插件配置
configSchema.plugin(autoIncrement.plugin, {
	model: 'Config',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});


// 分类模型
module.exports = mongoose.model('Config', configSchema);
