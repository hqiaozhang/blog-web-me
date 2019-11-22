/*
*所有的路由接口
*/
const baseUrl = 'backend'
const user = require('./user');
const article = require('./article');
const Project = require('./project');
module.exports = app => {
	app.post(`/${baseUrl}/users/login`, user.login);
	// 菜单
	app.get(`/${baseUrl}/users/getFuncMenu`, user.getFuncMenu);
	// 字典配置
	app.get(`/${baseUrl}/users/getConfig`, user.getConfig);
	
	
	// article ===========文章管理
	// 查询文章列表
	app.post(`/${baseUrl}/article/list`, article.getArticleList);
	// 新增文章
	app.post(`/${baseUrl}/article/add`, article.addArticle);
	// 删除文章
	app.post(`/${baseUrl}/article/del`, article.deleteArticle);
	// 更新
	app.post(`/${baseUrl}/article/update`, article.updateArticle);

	// project ===========项目管理
	// 查询项目列表
	app.post(`/${baseUrl}/project/list`, Project.getProjectList);
	// 项目创建
	app.post(`/${baseUrl}/project/add`, Project.addProject);
	// 删除项目
	app.post(`/${baseUrl}/project/del`, Project.deleteProject);
	// 编辑项目
	app.post(`/${baseUrl}/project/update`, Project.updateProject);
	// 查询项目详情
	app.get(`/${baseUrl}/project/detail`, Project.getProjectDetail);
	// 项目图片上传
	app.post(`/${baseUrl}/project/uploadImg`, Project.uploadProjectImg)
	
};
