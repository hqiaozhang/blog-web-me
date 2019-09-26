/**
 * Constants module.
 * @file 数据表常量模块
 * @module core/constants
 * @author biaochenxuying <https://github.com/biaochenxuying>
 */



// 发布状态
exports.PUBLISH_STATE = {
	draft: 0, // 草稿
	published: 1, // 已发布
	recycle: -1, // 回收站
};

// 公开状态
exports.PUBLIC_STATE = {
	password: 0, // 需要密码
	public: 1, // 公开状态
	secret: -1, // 私密
};

// 转载状态
exports.ORIGIN_STATE = {
	original: 0, // 原创
	reprint: 1, // 转载
	hybrid: -1, // 混合
};

exports.COMMENT_STATE = {
	auditing: 0, // 待审核
	published: 1, // 通过正常
	deleted: -1, // 已删除
	spam: -2, // 垃圾评论
};

// 评论宿主页面的 POST_ID 类型
exports.COMMENT_POST_TYPE = {
	guestbook: 0, // 留言板
};

// 评论本身的类型
exports.COMMENT_PARENT_TYPE = {
	self: 0, // 自身一级评论
};

// 排序状态
exports.SORT_TYPE = {
	asc: 1, // 升序
	desc: -1, // 降序
};

// 喜欢类型
exports.LIKE_TYPE = {
	comment: 1,
	page: 2,
};

exports.CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


// 响应code
exports.RESCODE = {
	success: 200,
	error: 300,
}