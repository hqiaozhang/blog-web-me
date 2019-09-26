/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:41:43
 * @Email: 991034150@qq.com
 * @Description: 项目默认全局配置项
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-24 15:10:50
 */

//  const search = global.location.search

export default {
  // 是否使用mock模式，在mock模式下向服务器的请求被mockjs拦截
  mock: false, // search.indexOf('mock') !== -1,
  // 是否使用proxy模式，在proxy模式下会使用proxy的url来替换原来的url
  proxy: false,
  // 模拟websocket时，消息的推送间隔(毫秒)
  mockInterval: 3500,
  // 轮询请求时的时间间隔(毫秒)
  fetchInterval: 6000,
  // 主要用于前后台联调，代理服务器域名，当proxy为true时，所有ajax请求都会发送到这个域名
  proxyHost: '/healthcloud',
  // 主要用于前后台联调，websocket代理服务器域名，当proxy为true时，所有websocket都会连接到这个域名
  websocketProxyHost: 'ws://192.168.5.16:8082/protal/bdcds',
  // 线上服务器域名，当访问URL时不加mock或proxy时，所有ajax请求都会发送到这个域名
  host: '/backend',
  // websocket线上服务器域名，当访问URL时不加mock或proxy时，所有websocket都会连接到这个域名
  websocketHost: 'ws://58.83.189.232:18001/healthcloud',
};
