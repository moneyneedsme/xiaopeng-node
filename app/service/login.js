'use strict';
const jscode2session = 'https://api.weixin.qq.com/sns/jscode2session';
const Service = require('egg').Service;
class UserService extends Service {
  async login(uid) {
    const user = {
      a: 1,
      uid,
    };
    return user;
  }

  async getSessionKey(js_code) {
    const url = jscode2session + `?appid=wx3d46697adade4630&secret=98368b38188824e609a83a341dc8a401&js_code=${js_code}&grant_type=authorization_code`;
    const result = await this.ctx.curl(url, {
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = UserService;
