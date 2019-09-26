/*
 * @Author: zhanghongqia
 * @email: 991034150@qq.com
 * @Date: 2018-06-01 22:06:40
 * @Description: 页面渲染前加载配置项
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-07-02 11:47:16
 */

import config from '@/config';
import apis from './apiloader';

export default {
  /**
   * 执行初始化操作，然后执行app的初始化逻辑
   * @param    {Object}  app 页面实例配置
   * @example 参数示例
   * {
   *  config: {},
   *  apis: {}
   * }
   */
  load(app) {
    // 将应用配置合并到全局api
    config.merge(app.config);

    // 将应用的接口配置合并到全局api
    apis.merge(app.apis);
  },
};
