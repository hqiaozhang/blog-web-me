/*
 * @Author: zhanghongqiao@hiynn.com
 * @Date: 2018-04-18 11:05:26
 * @Description: 共用方法
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-07-02 10:59:52
 */

/**
 *  获取某个范围的随机数
 *  @param    {number}  min 最大值
 *  @param    {number}  max 最小值
 *  @return   {object}  null
 */
export const randomNumber = (min, max) => {
  const range = max - min;
  const rand = Math.random();
  const num = min + Math.round(rand * range);
  return num;
};

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  const {length} = list;
  let index = 0;
  let value;
  while (++index < length) {
    value = list[index];
    if (f(value, index, list)) {
      return value;
    }
  }
}


/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key));
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isPromise(val) {
  return val && typeof val.then === 'function';
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`);
}


/**
 * 设置Cookie
 * @param {string} key
 * @param {*} val
 * @param {*} path
 */
export function setCookie(key, val, path) {
  if (!path) path = '/';
  document.cookie = `${key }=${ val}; expires=Session; path=${ path}`; //设置cookie
  // var Days = 30;
  // var exp = new Date();
  // exp.setTime(exp.getTime() + Days*24*60*60*1000);
  // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


/**
 * 获取Cookie
 * @param {string} key 获取 Cookie
 */
export function getCookie(key) {
  /*获取cookie参数*/
  const getCookie = document.cookie.replace(/[ ]/g, ''); //获取cookie，并且将获得的cookie格式化，去掉空格字符
  const arrCookie = getCookie.split(';'); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  let tips; //声明变量tips
  for (let i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
    const arr = arrCookie[i].split('='); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1]; //将cookie的值赋给变量tips
      break; //终止for循环遍历
    }
  }
  return tips;
}


//清除cookie
export function clearCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 20);
  const cval = getCookie(name);
  if (cval != null) {
    console.log(`=0${  cval  };expires=${  exp.toGMTString()}`);
    document.cookie = `${name }=0${cval };expires=${exp.toGMTString()}`;
  }
}

/**
 * 获取地址栏参数
 * @param {string} name
 */
export function getUrlParms(name) {
  const reg = new RegExp(`(^|&)${  name  }=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) { return unescape(r[2]); }
  return null;
}
