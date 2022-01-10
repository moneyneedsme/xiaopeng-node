'use strict';

module.exports = {
  success(data, status = 200) {
    this.body = {
      data,
      errorCode: null,
      errorMessage: null,
      success: true,
    };
    this.status = status || 200;
  },

  fail(errorMessage = '系统繁忙，请稍后再试', status = 500) {
    this.body = {
      data: null,
      errorCode: -1,
      errorMessage,
      success: false,
    };
    this.status = status;
  },

};
