'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  // 查询配置
  async getConfig() {
    const { ctx } = this;
    const config = await ctx.service.home.getConfig();
    if (config) {
      ctx.success(config);
    } else {
      ctx.fail();
    }
  }
}

module.exports = HomeController;
