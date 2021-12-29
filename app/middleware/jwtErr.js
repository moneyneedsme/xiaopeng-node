'use strict';
module.exports = () => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (e) {
      ctx.status = 403;
      ctx.body = {
        success: false,
        errorMessage: '身份过期,重新登录',
        errorCode: 1,
      };
    }
  };
};
