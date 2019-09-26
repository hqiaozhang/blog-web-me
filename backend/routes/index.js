/*
*所有的路由接口
*/
const baseUrl = 'backend'
const user = require('./user');
const article = require('./article');
module.exports = app => {
	app.post(`/${baseUrl}/users/login`, user.login);
	// 菜单
	app.get(`/${baseUrl}/users/getFuncMenu`, user.getFuncMenu);
	
	// article ===========文章管理
	// 查询文章列表
	app.post(`/${baseUrl}/article/getArticleList`, article.getArticleList);
	// 新增文章
	app.post(`/${baseUrl}/article/add`, article.addArticle);
	// 删除文章
	app.post(`/${baseUrl}/article/del`, article.deleteArticle);
	// 更新
	app.post(`/${baseUrl}/article/update`, article.updateArticle);
};
