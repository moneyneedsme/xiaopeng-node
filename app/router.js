'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getConfig', controller.home.getConfig); // 获取配置信息
  router.post('/login', controller.login.index); // 登录注册
  router.post('/setInfo', app.jwt, controller.login.setInfo); // 设置用户信息
  router.post('/signIn', app.jwt, controller.home.signIn); // 签到
};
