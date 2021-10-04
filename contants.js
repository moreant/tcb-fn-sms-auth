const SUCCESS_CODE = 200

module.exports.RETURN_STATUS = {
  [0]: {
    code: 500,
    msg: '未知错误'
  },

  [10000]: {
    code: SUCCESS_CODE,
    msg: '清空过期验证码成功'
  },

  [10001]: {
    code: SUCCESS_CODE,
    msg: '短信验证码发送成功'
  },

  [10002]: {
    code: SUCCESS_CODE,
    msg: '成功获取登录ticket'
  },

  [10003]: {
    code: SUCCESS_CODE,
    msg: '验证码有效'
  },

  [20000]: {
    code: 20000,
    msg: '请检查 "cmd" / "Message" 参数是否有效'
  },

  [20001]: {
    code: 20001,
    msg: '验证码填写错误'
  },

  [20002]: {
    code: 20002,
    msg: '验证码无效'
  },

  [20003]: {
    code: 20003,
    msg: '超过发送频率限制'
  }
}
