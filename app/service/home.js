'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async getConfig() {
    const config = await this.app.mysql.get('config'); // 查询系统配置
    return {
      config,
    };
  }
}

module.exports = UserService;
