'use strict';
const Service = require('egg').Service;
class PointService extends Service {
  async signIn(userId, num = 0) {
    const user = await this.app.mysql.get('user', { userId });
    if (!user) {
      return false;
    }
    const point = (user.point || 0) + num;
    const options = {
      where: {
        userId,
      },
    };
    const result = await this.app.mysql.update('user', { point, signed: 1 }, options);
    if (result.affectedRows === 1) { // 更新成功
      const pointData = {
        userId: user.userId,
        nickName: user.nickName,
        avatarUrl: user.avatarUrl,
        point: '+' + num,
        describe: '签到',
        time: new Date().getTime(),
        type: 1, // 1是收入，2是消费
      };
      this.app.mysql.insert('point', pointData);
      return point;
    }
    return false;
  }

  async getPointsDetails(params) {
    const where = {
      userId: params.userId,
    };
    let queryWhere = `userId = '${params.userId}'`;
    if (params.type) {
      where.type = params.type;
      queryWhere = queryWhere + 'AND type IN(1,2)';
    }
    const list = await this.app.mysql.select('point', {
      where,
      columns: [ 'point', 'describe', 'time' ],
      limit: params.pageSize,
      offset: ((params.pageSize * params.pageNo) - params.pageSize),
    });
    const mysql = `SELECT COUNT(*) as total FROM point WHERE ${queryWhere}`;
    const total = await this.app.mysql.query(mysql);
    return {
      list,
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      total: total[0].total,
    };
  }
  async taskSign() {
    const options = {
      where: {
      },
    };
    const result = await this.app.mysql.update('user', { signed: 0 }, options);
    console.log('定时任务taskSign：', result.affectedRows === 1);
  }
}

module.exports = PointService;
