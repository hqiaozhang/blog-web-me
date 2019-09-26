/**
 * App config module.
 * @file 应用运行配置
 * @module app.config
 * @author biaochenxuying <https://github.com/biaochenxuying>
 */

const path = require('path');
const { argv } = require('yargs');
// const package = require('package')

exports.APP = {
	LIMIT: 10,
	PORT: 8000,
	ROOT_PATH: __dirname,
	NAME: 'biaochenxuying',
	URL: 'http://biaochenxuying.cn/main.html',
	FRONT_END_PATH: path.join(__dirname, '..', 'biaochenxuying'),
};

exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/blogNode`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password',
};
